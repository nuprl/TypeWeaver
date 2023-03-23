from concurrent import futures
from datasets import load_dataset, load_from_disk
from datetime import date, datetime
from pathlib import Path
from subprocess import PIPE
from tempfile import NamedTemporaryFile
from tqdm import tqdm
from tree_sitter import Language, Parser, Node, Tree
import argparse, os, pickle, re, subprocess

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
        "--unannotate",
        action="store_true",
        help="add a column with the file content, with type annotations removed")
    group.add_argument(
        "--cutoff",
        nargs="?",
        const=DEFAULT_CUTOFF.strftime('%Y-%m-%d'),
        help=f"filter dataset for files after the specified cutoff date, in YYYY-MM-DD format; defaults to {DEFAULT_CUTOFF.strftime('%Y-%m-%d')}")

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
    if args.output:
        util.check_exists(args.output)
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
        # features: content, avg_line_length, max_line_length, alphanum_fraction,
        # licenses, repository_name, path, size, lang
        print("Loading dataset from Hugging Face...", flush=True)
        return load_dataset(THE_STACK,
                            data_dir="data/typescript",
                            split="train",
                            revision=revision,
                            num_proc=workers)
    else:
        print(f"Loading dataset from disk ({dataset_dir})...", flush=True)
        return load_from_disk(dataset_dir)

def is_after_cutoff(dataset_example, cutoff):
    def parsedate(string):
        if string is None:
            return None
        else:
            return datetime.strptime(string, "%Y-%m-%dT%H:%M:%S.%fZ")

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
                  or (EXPORT_RE.match(l)
                      and not EXPORT_RE2.match(l))
                  or "<!DOCTYPE TS>" in l)
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

def get_content(dataset_example):
    return dataset_example["content"]

def get_repo_and_path(dataset_example):
    if THE_STACK == "bigcode/the-stack-smol":
        return dataset_example["repository_name"], dataset_example["path"]
    else:
        return dataset_example["max_stars_repo_name"], dataset_example["max_stars_repo_path"]

def needs_processing(checkpoint, dataset_example):
    return get_key(dataset_example) not in checkpoint

def filter_typechecks(dataset, args):
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
        fs = [executor.submit(run_tsc, get_key(d), get_content(d))
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

def str_to_tree(contents):
    return PARSER.parse(bytes(contents, "utf-8"))

def node_to_str(node):
    return node.text.decode("utf-8")

def create_query(query):
    return TS_LANGUAGE.query(query)

def run_query(tree, query):
    captures = query.captures(tree.root_node)
    return len(captures)

def count_funcs(tree):
    """
    Counts the number of functions in the tree. This is a proxy for the number
    of annotation sites for function return types.
    """
    QUERY = create_query("""
[
  (function_declaration) @func
  (function) @func
  (function_signature) @func
  (arrow_function) @func
  (method_definition) @func
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
    Counts occurrences of "eval", "typeof", "instanceof", and "with".
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

    return num_eval + num_with + num_typeof + num_instanceof

def compute_metrics(content):
    tree = str_to_tree(content)

    return {
        "functions": count_funcs(tree),
        "function_parameters": count_func_params(tree),
        "variable_declarations": count_var_decls(tree),
        "property_declarations": count_prop_decls(tree),
        "trivial_types": count_trivial_types(tree),
        "predefined_types": count_predefined_types(tree),
        "type_definitions": count_type_defs(tree),
        "dynamism_heuristic": compute_dynamism_heuristic(tree)
    }

def main():
    args = parse_args()
    workers = args.workers
    dataset_dir = args.dataset
    from_hf = args.from_hf
    output_dir = args.output
    cutoff = args.cutoff

    dataset = load(from_hf, dataset_dir, workers)
    print("Dataset size:", len(dataset))

    if args.typecheck:
        dataset = filter_typechecks(dataset, args)

    if args.metrics:
        # TODO
        pass

    if args.tokenize:
        # TODO
        pass

    if args.unannotate:
        # TODO
        pass

    if cutoff:
        print(f"Filtering for files after the {cutoff.strftime('%Y-%m-%d')} cutoff", flush=True)
        dataset = dataset.filter(lambda d: is_after_cutoff(d, cutoff),
                                num_proc=workers)
        print("Size after filtering:", len(dataset))

    # TODO: also want to do some filtering on the metrics, probably want to compute ratios,
    # e.g. a really long file with only one annotation site is bad
    # probably not worth filtering dynamism, there are legitimate uses and it's only a small percentage of files

    if output_dir:
        print("Saving result to", output_dir, flush=True)
        dataset.save_to_disk(output_dir, num_proc=workers)

if __name__ == "__main__":
    main()
