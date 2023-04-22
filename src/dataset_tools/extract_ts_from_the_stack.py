from concurrent import futures
from datasets import Dataset, load_dataset, load_from_disk
from datetime import date, datetime
from pathlib import Path
from subprocess import PIPE
from tempfile import NamedTemporaryFile
from tqdm import tqdm
from transformers import AutoTokenizer
from transformers.utils import logging
from tree_sitter import Language, Parser, Node, Tree
import argparse, numpy as np, os, pickle, pprint, re, subprocess

import util

# THE_STACK = "bigcode/the-stack-smol"
THE_STACK = "bigcode/the-stack-dedup"

DEFAULT_CUTOFF = datetime(2021, 12, 31)

TSC_PATH = Path(Path(__file__).parent, "node_modules", ".bin", "tsc").resolve()
if not Path(TSC_PATH).exists():
    print("Could not find cloc: {}".format(TSC_PATH))
    exit(1)

IMPORT_RE = re.compile("^\s*import(\*|\{|\s)")
REQUIRE_RE = re.compile("^.*\s+require\s*\(.+\)")
EXPORT_RE = re.compile("export[^\w_$]")
EXPORT_RE2 = re.compile("export[^\w_$]\s*(function|class|interface|type|enum|const|declare|default|async)")

Language.build_library(
    f"{Path(__file__).parent}/build/languages.so",
    [f"{Path(__file__).parent}/tree-sitter-typescript/typescript"]
)
TS_LANGUAGE = Language(f"{Path(__file__).parent}/build/languages.so", 'typescript')
PARSER = Parser()
PARSER.set_language(TS_LANGUAGE)

def parse_args():
    cpu_count = os.cpu_count();

    parser = argparse.ArgumentParser(description="Extracts and processes TypeScript files from The Stack")
    parser.add_argument(
        "--dataset",
        type=str,
        help="directory to read dataset")
    parser.add_argument(
        "--from-hf",
        action="store_true",
        help="load dataset from Hugging Face, otherwise load from DATASET")
    parser.add_argument(
        "--checkpoint",
        type=str,
        help=f"file for saving checkpoints")
    parser.add_argument(
        "--checkpoint-steps",
        type=int,
        default=1000,
        help="number of steps to save a checkpoint, defaults to 1000")
    parser.add_argument(
        "--output",
        type=str,
        help="directory to write dataset to")
    parser.add_argument(
        "--workers",
        type=int,
        default=cpu_count,
        help=f"maximum number of workers to use, defaults to {cpu_count}, the number of processors on the machine")

    group = parser.add_argument_group(title="task to run")
    group.add_argument(
        "--parse",
        action="store_true",
        help="filter dataset for files that parse")
    group.add_argument(
        "--typecheck",
        action="store_true",
        help="filter dataset for files that type check")
    group.add_argument(
        "--metrics",
        action="store_true",
        help="add columns for dataset metrics")
    group.add_argument(
        "--tokenize",
        action="store_true",
        help="add a column with the number of tokens")
    group.add_argument(
        "--filter",
        action="store_true",
        help="filter out 'low quality' examples")
    group.add_argument(
        "--cutoff",
        nargs="?",
        const=DEFAULT_CUTOFF.strftime('%Y-%m-%d'),
        help=f"filter dataset for files after the specified cutoff date, in YYYY-MM-DD format; defaults to {DEFAULT_CUTOFF.strftime('%Y-%m-%d')}")
    group.add_argument(
        "--unannotate",
        action="store_true",
        help="add a column with the file content, with type annotations removed")
    group.add_argument(
        "--skim",
        action="store_true",
        help="browse through the dataset, one example at a time")

    args = parser.parse_args()
    if not (args.dataset or args.from_hf):
        parser.print_usage()
        print("error: must provide --dataset or --from-hf")
        exit(2)
    elif args.dataset and args.from_hf:
        parser.print_usage()
        print("error: must provide only one of --dataset and --from-hf")
        exit(2)
    if args.dataset:
        util.check_exists(args.dataset)
    if args.output and not args.output.endswith(".parquet"):
        Path(args.output).mkdir(parents=True, exist_ok=True)
    if args.cutoff is not None:
        try:
            args.cutoff = datetime.strptime(args.cutoff, "%Y-%m-%d")
        except:
            parser.print_usage()
            print("error: --cutoff argument must be in YYYY-MM-DD format")
            exit(2)

    return args

def load(from_hf, dataset_dir, workers):
    if from_hf:
        revision = "v1.1" if THE_STACK == "bigcode/the-stack-dedup" else "v1.0"
        print("Loading dataset from Hugging Face...", flush=True)
        return load_dataset(THE_STACK,
                            data_dir="data/typescript",
                            split="train",
                            revision=revision,
                            num_proc=workers)
    elif dataset_dir.endswith(".parquet"):
        print(f"Loading dataset from Parquet file ({dataset_dir})...", flush=True)
        return Dataset.from_parquet(dataset_dir)
    else:
        print(f"Loading dataset from disk ({dataset_dir})...", flush=True)
        return load_from_disk(dataset_dir)

def parsedate(string):
    if string is None:
        return None
    else:
        return datetime.strptime(string, "%Y-%m-%dT%H:%M:%S.%fZ")

def is_after_cutoff(dataset_example, cutoff):
    if THE_STACK == "bigcode/the-stack-smol":
        # The Stack Smol has no timestamps so we can't filter
        return TRUE
    else:
        stars_date = parsedate(dataset_example["max_stars_repo_stars_event_min_datetime"])
        forks_date = parsedate(dataset_example["max_forks_repo_forks_event_min_datetime"])
        issues_date = parsedate(dataset_example["max_issues_repo_issues_event_min_datetime"])

        timestamps = [t for t in [stars_date, forks_date, issues_date]
                      if t is not None]

        if not timestamps:
            # If there is no timestamp, conservatively reject.
            # Affects about 10% of dataset.
            return False

        # We want ALL the timestamps to be after the cutoff
        return all(cutoff < t for t in timestamps)

def is_typescript(example):
    # Remove non-ts extensions (i.e. tsx extensions)
    if example["ext"] != "ts":
        return False

    content = example["content"]

    # Qt TS (translations), in XML format
    if "<!DOCTYPE TS>" in content:
        return False

    # TSurf data file
    if "GOCAD TSurf" in content:
        return False

    # Time series data
    if "@problemName" in content:
        return False

    return True

def parses(content):
    root = str_to_tree(content).root_node
    return not root.has_error

def filter_parses(dataset, args):
    print("Filtering for actual TypeScript files")
    dataset = dataset.filter(is_typescript, num_proc=args.workers)
    print("Number of TypeScript files:", len(dataset))

    print("Parsing files")
    dataset = dataset.filter(lambda e: parses(get_content(e)),
                             num_proc=args.workers)
    print("Files that parse: ", len(dataset))

    return dataset

def load_checkpoint(checkpoint_file):
    checkpoint = {}
    if checkpoint_file and Path(checkpoint_file).exists():
        with open(checkpoint_file, 'rb') as f:
            checkpoint = pickle.load(f)
    return checkpoint

def save_checkpoint(checkpoint, checkpoint_file, message=None):
    if checkpoint_file:
        if message:
            print(message, flush=True)
        with open(checkpoint_file, 'wb') as f:
            pickle.dump(checkpoint, f)

def self_contained(content):
    matches = any(l for l in content.splitlines()
                  if IMPORT_RE.match(l)
                  or REQUIRE_RE.match(l)
                  or (EXPORT_RE.match(l) and not EXPORT_RE2.match(l)))
    return not matches

def run_tsc(key, content):
    with NamedTemporaryFile(mode="w", suffix=".ts", encoding="utf-8") as f:
        # Save content to temp file
        print(content, file=f, end="", flush=True)
        tmpfile = Path(f.name)

        # Run tsc on temp file
        args = [TSC_PATH, "--noEmit", "--lib", "es2021", tmpfile]
        result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=tmpfile.parent)

        return key, result.returncode == 0

def get_key(dataset_example):
    if THE_STACK == "bigcode/the-stack-smol":
        return dataset_example["repository_name"] + "@@" + dataset_example["path"]
    else:
        return dataset_example["hexsha"]

def get_repo_file_name(example):
    if THE_STACK == "bigcode/the-stack-smol":
        return example["repository_name"] + " " + example["path"]
    else:
        return example["max_stars_repo_name"] + " " + example["max_stars_repo_path"]

def get_content(dataset_example):
    return dataset_example["content"]

def get_repo_and_path(dataset_example):
    if THE_STACK == "bigcode/the-stack-smol":
        return dataset_example["repository_name"], dataset_example["path"]
    else:
        return dataset_example["max_stars_repo_name"], dataset_example["max_stars_repo_path"]

def needs_processing(checkpoint, dataset_example):
    return get_key(dataset_example) not in checkpoint

def filter_typechecks(dataset, args, content_key="content"):
    workers = args.workers
    checkpoint_file = args.checkpoint
    checkpoint_steps = args.checkpoint_steps

    # Load checkpoint file if it exists
    checkpoint = load_checkpoint(checkpoint_file)

    print("Filtering out import/export/require", flush=True)
    filtered = dataset.filter(lambda d: self_contained(get_content(d)),
                              num_proc=workers)

    if len(checkpoint) == 0:
        to_typecheck = filtered
    else:
        # This is slow, but setting up workers is even slower
        print("Already typechecked:", len(checkpoint), flush=True)
        to_typecheck = [f for f in tqdm(filtered, desc="Applying checkpoint")
                        if needs_processing(checkpoint, f)]

    print("To typecheck:", len(to_typecheck), flush=True)
    with futures.ProcessPoolExecutor(max_workers=workers) as executor:
        fs = [executor.submit(run_tsc, get_key(d), d[content_key])
            for d in tqdm(to_typecheck, desc="Preparing workers")]
        for i, f in enumerate(tqdm(fs, desc="Type checking", miniters=1)):
            key, result = f.result()
            checkpoint[key] = result
            if (i + 1) % checkpoint_steps == 0:
                save_checkpoint(checkpoint, checkpoint_file, f"Saving checkpoint at step {i+1}")

    save_checkpoint(checkpoint, checkpoint_file, "Saving final checkpoint")

    print("Filtering dataset for files that type check", flush=True)
    typechecks = filtered.filter(lambda d: checkpoint[get_key(d)],
                                 num_proc=workers)

    print("Original dataset size:", len(dataset))
    print("Filtered dataset size:", len(filtered))
    print("Type checks dataset size:", len(typechecks), flush=True)

    return typechecks

def str_to_tree(content):
    return PARSER.parse(bytes(content, "utf-8"))

def node_to_str(node):
    return node.text.decode("utf-8")

def create_query(query):
    return TS_LANGUAGE.query(query)

def run_query(tree, query):
    captures = query.captures(tree.root_node)
    return len(captures)

def delete_between_indices(content, pairs):
    """
    Given a content string and a list of pairs of indices representing nodes
    (specifically, their start and end bytes in the byte array), return a new
    string with those nodes deleted.
    """
    # Need to operate on byte string, not characters
    content_bytes = content.encode("utf-8")

    # Flatten the pairs of indices into a list. But we also want to prepend 0
    # and append the last index of content, so we can re-pair the indices later
    # e.g. [(s1, e1), (s2, e2)]
    #   -> [0, s1, e1, s2, e2, n]
    indices = [0] + [i
                     for p in pairs
                     for i in p]
    indices.append(len(content_bytes))

    # We zip the list with itself (offset by 1), moving by 2 elements each time,
    # e.g. [0, s1, e1, s2, e2, n]
    #   -> [(0, s1), (e1, s2), (e2, n)]
    chunks = []
    for s, e in zip(indices[::2], indices[1::2]):
        chunks.append(content_bytes[s:e].decode("utf-8"))
    new_content = "".join(chunks)

    return new_content

def get_loc(content):
    # Parse the string to get comment AST nodes
    QUERY = create_query("(comment) @comment")
    tree = str_to_tree(content)
    captures = QUERY.captures(tree.root_node)
    pairs = [[c[0].start_byte, c[0].end_byte] for c in captures]

    # Delete comments from the string
    no_comments = delete_between_indices(content, pairs)

    # Split string by newlines, delete empty lines
    lines = no_comments.split("\n")
    no_blanks = [l for l in lines if l.strip()]

    return len(no_blanks)

def count_funcs(tree):
    """
    Counts the number of functions in the tree. This is a proxy for the number
    of annotation sites for function return types.
    """
    QUERY = create_query("""
[
  (function_declaration) @func
  (function) @func
  (arrow_function) @func
  (method_definition) @func
]
""")
    return run_query(tree, QUERY)

def count_func_sigs(tree):
    """
    Counts the number of function and method signatures. These are function
    declarations without function bodies.
    """
    QUERY = create_query("""
[
  (function_signature) @func
  (method_signature) @func
]
""")
    return run_query(tree, QUERY)

def count_func_params(tree):
    """
    Counts the number of function parameters in the tree. Note: need to avoid
    capturing type parameters.
    """
    QUERY = create_query("""
[
  (function_declaration
    parameters: (formal_parameters
      [(required_parameter) (optional_parameter)] @param))
  (function
    parameters: (formal_parameters
      [(required_parameter) (optional_parameter)] @param))
  (function_signature
    parameters: (formal_parameters
      [(required_parameter) (optional_parameter)] @param))
  (arrow_function
    parameters: (formal_parameters
      [(required_parameter) (optional_parameter)] @param))
  (arrow_function
    parameter: (identifier) @param)
  (method_definition
    parameters: (formal_parameters
      [(required_parameter) (optional_parameter)] @param))
  (method_signature
    parameters: (formal_parameters
      [(required_parameter) (optional_parameter)] @param))
]
""")
    return run_query(tree, QUERY)

def count_var_decls(tree):
    """
    Counts the number of variable declarators in the tree.
    """
    QUERY = create_query("""
  (variable_declarator) @declarator
""")
    return run_query(tree, QUERY)

def count_prop_decls(tree):
    """
    Counts class fields and property declarations that can be type annotated.
    """
    QUERY = create_query("""
[
  (public_field_definition) @prop
  (type_alias_declaration
    (object_type
      (property_signature) @prop))
  (interface_declaration
    (object_type
      (property_signature) @prop))
]
""")
    return run_query(tree, QUERY)

def count_trivial_types(tree):
    """
    Counts trivial type annotations, i.e. "any", "any" being used as type
    arguments, and "Function"
    """
    QUERY = create_query("""
[
  (predefined_type) @annotation
  (type_identifier) @annotation
  (#match? @annotation "^(any|Function)$")
]
""")
    return run_query(tree, QUERY)

def count_predefined_types(tree):
    """
    Counts predefined types (that aren't "any") in the tree. These types are:
    number, boolean, string, symbol, void, unknown, never, object
    """
    QUERY = create_query("""
(
  (predefined_type) @annotation
  (#match? @annotation "^(number|boolean|string|symbol|void|unknown|never|object)$")
)
""")
    return run_query(tree, QUERY)

def count_type_defs(tree):
    """
    Count type definitions, i.e. type aliases, class definitions, and interface definitions.
    """
    QUERY = create_query("""
[
  (interface_declaration
    name: (type_identifier) @name)
  (class_declaration
    name: (type_identifier) @name)
  (abstract_class_declaration
    name: (type_identifier) @name)
  (type_alias_declaration
    name: (type_identifier) @name)
]
""")
    return run_query(tree, QUERY)

def compute_dynamism_heuristic(tree):
    """
    A heuristic for how "dynamic" a program is (and therefore less suitable for TypeScript).
    Counts occurrences of "eval", "as", "with", "typeof", and "instanceof".
    This is not an exhaustive list.
    """
    EVAL_QUERY = create_query("""
(
  (call_expression
    function: (identifier) @id)
  (#eq? @id "eval")
)
""")
    num_eval = run_query(tree, EVAL_QUERY)

    AS_QUERY = create_query("(as_expression) @node")
    num_as = run_query(tree, AS_QUERY)

    WITH_QUERY = create_query("(with_statement) @node")
    num_with = run_query(tree, WITH_QUERY)

    TYPEOF_QUERY = create_query("(unary_expression) @node")
    num_typeof = 0
    for c in TYPEOF_QUERY.captures(tree.root_node):
        children = c[0].children
        if children and children[0].type == "typeof":
            num_typeof += 1

    INSTANCEOF_QUERY = create_query("(binary_expression) @node")
    num_instanceof = 0
    for c in INSTANCEOF_QUERY.captures(tree.root_node):
        children = c[0].children
        if len(children) > 1 and children[1].type == "instanceof":
            num_instanceof += 1

    return num_eval + num_as + num_with + num_typeof + num_instanceof

def loc_per_function(content):
    QUERY = create_query("""
[
  (function_declaration
    body: (_) @body)
  (function
    body: (_) @body)
  (arrow_function
    body: (_) @body)
  (method_definition
    body: (_) @body)
]
""")
    tree = str_to_tree(content)
    captures = QUERY.captures(tree.root_node)
    nodes = [c[0] for c in captures]

    # Remove whitespace and open/close braces
    fun_loc = [get_loc(node_to_str(n).strip().strip("{}"))
               for n in nodes]
    avg_loc = sum(fun_loc) / len(fun_loc) if fun_loc else 0.0

    return avg_loc

def count_function_usages(content):
    """
    Counts the number of function usages in the given content string.
    Matches function/method calls to function declarations (including assigning
    an anonymous function to a local variable) by comparing the identifiers.
    """
    FUN_QUERY = create_query("""
[
  (function_declaration
    name: (_) @name)
  (function
    name: (_) @name)
  (method_definition
    name: (_) @name)
  (variable_declarator
    name: (identifier) @name
    value: [(arrow_function) (function)])
  (assignment_expression
    left: (identifier) @name
    right: [(arrow_function) (function)])
  (assignment_expression
    left: (member_expression
      property: (_) @name)
    right: [(arrow_function) (function)])
]
""")

    CALL_QUERY = create_query("""
[
  (call_expression
    function: (identifier) @call)
  (call_expression
    function: (member_expression
      property: (_) @call))
]
""")

    root = str_to_tree(content).root_node

    fun_nodes = { node_to_str(c[0]) for c in FUN_QUERY.captures(root) }
    call_nodes = { node_to_str(c[0]) for c in CALL_QUERY.captures(root) }
    overlap = fun_nodes & call_nodes

    return len(overlap)

def add_metrics(example):
    content = example["content"]
    tree = str_to_tree(content)

    example["loc"] = get_loc(content)
    example["functions"] = count_funcs(tree)
    example["function_signatures"] = count_func_sigs(tree)
    example["function_parameters"] = count_func_params(tree)
    example["variable_declarations"] = count_var_decls(tree)
    example["property_declarations"] = count_prop_decls(tree)
    example["function_usages"] = count_function_usages(content)
    example["trivial_types"] = count_trivial_types(tree)
    example["predefined_types"] = count_predefined_types(tree)
    example["type_definitions"] = count_type_defs(tree)
    example["dynamism_heuristic"] = compute_dynamism_heuristic(tree)
    example["loc_per_function"] = loc_per_function(content)

    return example

def add_token_count(tokenizer, example):
    example["estimated_tokens"] = len(tokenizer.encode(example["content"],
                                                       add_special_tokens=True))
    return example

def has_no_index_signature(dataset_example):
    QUERY = create_query("""
  (index_signature) @sig
""")
    content = dataset_example["content"]
    tree = str_to_tree(content)
    return run_query(tree, QUERY) == 0

def is_child_type_annotation(node):
    """Checks if any of the parent nodes is an annotation node."""
    node = node.parent
    while node is not None:
        if node.type == "type_annotation" or node.type == "opting_type_annotation" or node.type == "omitting_type_annotation":
            return True
        node = node.parent
    return False

def strip_annotations(content):
    QUERY = create_query("""
[
  (type_annotation) @annotation
  (opting_type_annotation) @annotation
  (omitting_type_annotation) @annotation
]
""")
    tree = str_to_tree(content)
    captures = QUERY.captures(tree.root_node)
    pairs = [[c[0].start_byte, c[0].end_byte]
             for c in captures
             if not is_child_type_annotation(c[0])]

    return delete_between_indices(content, pairs)

def add_stripped_annotations_column(example):
    example["content_without_annotations"] = strip_annotations(example["content"])
    return example

def get_ann_sites(example):
    funs = example["functions"]
    fun_sigs = example["function_signatures"]
    fun_params = example["function_parameters"]
    var_decls = example["variable_declarations"]
    prop_decls = example["property_declarations"]

    return funs + fun_sigs + fun_params + var_decls + prop_decls

def add_density_metrics(e):
    tokens = e["estimated_tokens"]
    if tokens == 0:
        e["fun_ann_density"] = 0
        e["var_ann_density"] = 0
        e["prop_ann_density"] = 0
        e["typedef_density"] = 0
        e["dynamism_density"] = 0
    else:
        e["fun_ann_density"] = (e["functions"] + e["function_parameters"]) / tokens
        e["var_ann_density"] = e["variable_declarations"] / tokens
        e["prop_ann_density"] = e["property_declarations"] / tokens
        e["typedef_density"] = e["type_definitions"] / tokens
        e["dynamism_density"] = e["dynamism_heuristic"] / tokens

    ann_sites = get_ann_sites(e)
    if ann_sites == 0:
        e["trivial_density"] = 0
        e["predefined_density"] = 0
    else:
        e["trivial_density"] = e["trivial_types"] / ann_sites
        e["predefined_density"] = e["predefined_types"] / ann_sites

    return e

def zscore(data, negate=False):
    a = np.array(data)
    mean = np.mean(a)
    sd = np.std(a, ddof=1)
    res = (a - mean) / sd
    return res

def normalize(data):
    a = np.array(data)
    minimum = np.min(a)
    maximum = np.max(a)
    res = (a - minimum) / (maximum - minimum)
    return res

def compute_weighted_metric(dataset, args):
    fun_ann_density = normalize(zscore(dataset["fun_ann_density"]))
    var_ann_density = normalize(zscore(dataset["var_ann_density"]))
    prop_ann_density = normalize(zscore(dataset["prop_ann_density"]))
    typedef_density = normalize(zscore(dataset["typedef_density"]))
    dynamism_density = normalize(-zscore(dataset["dynamism_density"]))
    trivial_density = normalize(-zscore(dataset["trivial_density"]))
    predefined_density = normalize(-zscore(dataset["predefined_density"]))
    loc_per_fun = normalize(zscore(dataset["loc_per_function"]))
    fun_usages = normalize(zscore(dataset["function_usages"]))

    # Same order as given above
    weights = np.array([25, 25, 0, 11, 1, 11, 5, 11, 11])
    weights = weights / np.sum(weights)

    factors = np.stack((fun_ann_density,
                        var_ann_density,
                        prop_ann_density,
                        typedef_density,
                        dynamism_density,
                        trivial_density,
                        predefined_density,
                        loc_per_fun,
                        fun_usages), axis=-1)

    metric = np.matmul(factors, weights)
    dataset = dataset.add_column("metric", metric)

    return dataset

def filter_quality(dataset, args):
    workers = args.workers

    print("Filtering for annotation sites > 0", flush=True)
    dataset = dataset.filter(lambda d: get_ann_sites(d) > 0, num_proc=workers)
    print("Size after filtering:", len(dataset))

    print("Filtering for lines of code >= 50", flush=True)
    dataset = dataset.filter(lambda d: d["loc"] >= 50, num_proc=workers)
    print("Size after filtering:", len(dataset))

    print("Filtering for functions > 0", flush=True)
    dataset = dataset.filter(lambda d: d["functions"] > 0, num_proc=workers)
    print("Size after filtering:", len(dataset))

    print("Filtering for lines of code per function >= 5", flush=True)
    dataset = dataset.filter(lambda d: d["loc_per_function"] >= 5, num_proc=workers)
    print("Size after filtering:", len(dataset))

    print("Adding density metrics", flush=True)
    dataset = dataset.map(add_density_metrics, num_proc=workers)

    print("Computing weighted metric", flush=True)
    dataset = compute_weighted_metric(dataset, args)

    metrics = np.array(dataset["metric"])
    cutoff = np.mean(metrics) - np.std(metrics, ddof=1)
    print(f"Filtering on combined metric (cutoff={cutoff})", flush=True)
    dataset = dataset.filter(lambda d: d["metric"] >= cutoff, num_proc=workers)
    print("Size after filtering:", len(dataset))

    return dataset

def main():
    args = parse_args()
    workers = args.workers
    dataset_dir = args.dataset
    from_hf = args.from_hf
    output_dir = args.output
    cutoff = args.cutoff

    dataset = load(from_hf, dataset_dir, workers)
    print("Dataset size:", len(dataset))

    if args.parse:
        dataset = filter_parses(dataset, args)

    if args.typecheck:
        dataset = filter_typechecks(dataset, args)

    if args.metrics:
        print("Adding metrics columns")
        dataset = dataset.map(add_metrics, num_proc=workers)

    if args.tokenize:
        print("Adding estimated_tokens column")
        # Supress warnings about token sequence length being too long
        logging.set_verbosity(logging.ERROR)
        tokenizer = AutoTokenizer.from_pretrained("bigcode/santacoder")
        dataset = dataset.map(lambda e: add_token_count(tokenizer, e),
                              num_proc=workers)
        # Reset warning level
        logging.set_verbosity(logging.WARN)

    if args.filter:
        dataset = filter_quality(dataset, args)

    if cutoff:
        print(f"Filtering for files after the {cutoff.strftime('%Y-%m-%d')} cutoff", flush=True)
        dataset = dataset.filter(lambda d: is_after_cutoff(d, cutoff),
                                num_proc=workers)
        print("Size after filtering:", len(dataset))

    if args.unannotate:
        # First, filter out files with index_signatures, since it doesn't make
        # sense to remove those annotations
        print("Removing files that can't be unannotated")
        dataset = dataset.filter(has_no_index_signature, num_proc=workers)
        print("Size after filtering: ", len(dataset))

        print("Adding new column with type annotations removed")
        dataset = dataset.map(add_stripped_annotations_column,
                              num_proc=workers)

    if output_dir:
        print("Saving result to", output_dir, flush=True)
        if output_dir.endswith(".parquet"):
            dataset.to_parquet(output_dir)
        else:
            dataset.save_to_disk(output_dir, num_proc=workers)

    if args.skim:
        pp = pprint.PrettyPrinter()
        for d in dataset:
            print("===REPO===")
            print(get_repo_file_name(d))
            print("===CONTENT===")
            pp.pprint(d)
            input("===EOF===")

if __name__ == "__main__":
    main()
