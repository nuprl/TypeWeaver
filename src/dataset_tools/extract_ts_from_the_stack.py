from concurrent import futures
from pathlib import Path
from subprocess import PIPE
from tempfile import NamedTemporaryFile
from tqdm import tqdm
from tree_sitter import Language, Parser, Node, Tree
import argparse, os, pickle, re, subprocess

import util

# THE_STACK = "bigcode/the-stack-smol"
THE_STACK = "bigcode/the-stack-dedup"

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

EMPTY_TREE = PARSER.parse(bytes("", "utf-8"))

def parse_args():
    cpu_count = os.cpu_count();

    parser = argparse.ArgumentParser(description="Extracts self-contained TypeScript files that type check")
    parser.add_argument(
        "--dataset-out",
        type=str,
        help=f"output directory to save resulting dataset")
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
        "--workers",
        type=int,
        default=cpu_count,
        help=f"maximum number of workers to use, defaults to {cpu_count}, the number of processors on the machine")

    args = parser.parse_args()
    if args.dataset_out:
        util.check_exists(args.dataset_out)

    return args

def load_checkpoint(checkpoint_file):
    # TODO: may want to compress file
    checkpoint = {}
    if checkpoint_file and Path(checkpoint_file).exists():
        with open(checkpoint_file, 'rb') as f:
            checkpoint = pickle.load(f)
    return checkpoint

def save_checkpoint(checkpoint, checkpoint_file, message=None):
    if message:
        print(message, flush=True)
    if checkpoint_file:
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
    # TODO: could this be done with pipes instead of temp files?
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

def extract_ts(args):
    from datasets import load_dataset

    workers = args.workers
    checkpoint_file = args.checkpoint
    checkpoint_steps = args.checkpoint_steps
    dataset_out = args.dataset_out

    # Load checkpoint file if it exists
    checkpoint = load_checkpoint(checkpoint_file)

    # features: content, avg_line_length, max_line_length, alphanum_fraction,
    # licenses, repository_name, path, size, lang
    print("Loading dataset", flush=True)
    dataset = load_dataset(THE_STACK,
                           data_dir="data/typescript",
                           split="train",
                           num_proc=workers)

    print("Filtering out import/export/require", flush=True)
    filtered = dataset.filter(lambda d: self_contained(d["content"]),
                              num_proc=workers)

    # TODO: this is very slow, could be parallelized
    print("Already typechecked:", len(checkpoint), flush=True)
    to_typecheck = [f for f in tqdm(filtered, desc="Applying checkpoint", unit="example")
                    if needs_processing(checkpoint, f)]

    print("To typecheck:", len(to_typecheck), flush=True)
    with futures.ProcessPoolExecutor(max_workers=workers) as executor:
        fs = [executor.submit(run_tsc, get_key(d), get_content(d))
              for d in to_typecheck]
        for i, f in enumerate(tqdm(fs, desc="Type checking", unit="file", miniters=1)):
            key, result = f.result()
            checkpoint[key] = result
            if (i + 1) % checkpoint_steps == 0:
                save_checkpoint(checkpoint, checkpoint_file, f"Saving checkpoint at step {i+1}")

    save_checkpoint(checkpoint, checkpoint_file, "Saving final checkpoint")

    print("Filtering dataset for files that type check", flush=True)
    typechecks = filtered.filter(lambda d: checkpoint[get_key(d)],
                                 num_proc=workers)

    if dataset_out:
        print("Saving result to", dataset_out, flush=True)
        typechecks.save_to_disk(dataset_out)

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
    for i, c in enumerate(captures):
        print(i + 1, node_to_str(c[0]))
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
  (arrow_function) @func
  (method_definition) @func
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
  (arrow_function
    parameters: (formal_parameters
      [(required_parameter) (optional_parameter)] @param))
  (method_definition
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

def compute_dynamism_heuristic(tree):
    """
    A heuristic for how "dynamic" a program is (and therefore less suitable for TypeScript).
    Counts occurrences of "eval", "typeof", "instanceof", and "with".
    This is not an exhaustive list.
    """
    QUERY = create_query(r"""
[
  (unary_expression) @node
  (binary_expression) @node
  (with_statement) @node
  (#match? @node "(^eval$|^typeof\\b|\\binstanceof\\b|\\bwith\\b)")
]
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

def main():
    args = parse_args()
    workers = args.workers
    dataset_out = args.dataset_out

    # TODO: filter for cutoff date

    # dataset = extract_ts(args)
    from datasets import load_from_disk
    dataset = load_from_disk(dataset_out)

if __name__ == "__main__":
    main()
