from datasets import Dataset
from pathlib import Path
from tree_sitter import Language, Parser, Node, Tree
import argparse, os, subprocess

import util

Language.build_library(
    f"{Path(__file__).parent.parent}/build/languages.so",
    [f"{Path(__file__).parent.parent}/tree-sitter-typescript/typescript"]
)
TS_LANGUAGE = Language(f"{Path(__file__).parent.parent}/build/languages.so", 'typescript')
PARSER = Parser()
PARSER.set_language(TS_LANGUAGE)

def parse_args():
    cpu_count = os.cpu_count();

    parser = argparse.ArgumentParser(description="Concatenates JavaScript projects into a single file per project")
    parser.add_argument(
        "--dataset",
        type=str,
        nargs="+",
        required=True,
        help="one or more directories to read datasets")
    parser.add_argument(
        "--output",
        type=str,
        help="directory to write dataset to")
    parser.add_argument(
        "--workers",
        type=int,
        default=cpu_count,
        help=f"maximum number of workers to use, defaults to {cpu_count}, the number of processors on the machine")

    args = parser.parse_args()
    if args.dataset:
        for d in args.dataset:
            util.check_exists(d)
    if args.output:
        util.check_exists(args.output)

    return args

def str_to_tree(contents):
    return PARSER.parse(bytes(contents, "utf-8"))

def node_to_str(node):
    return node.text.decode("utf-8")

def create_query(query):
    return TS_LANGUAGE.query(query)

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

def strip_imports(content):
    """
    Removes import statements from the given string.
    """
    QUERY = create_query("(import_statement) @import")
    tree = str_to_tree(content)
    captures = QUERY.captures(tree.root_node)
    pairs = [[c[0].start_byte, c[0].end_byte] for c in captures]

    return delete_between_indices(content, pairs)

def strip_exports(content):
    """
    Removes exports from the given string. If the export is exporting a
    declaration or an anonymous function, we want to replace the export with
    the declaration.
    """
    def get_indices(node):
        """
        Returns the start and end bytes of the node that we want to delete. For
        most export nodes, these will be the original start and end bytes.
        However, if the node is exporting a declaration or a function value, we
        want to adjust the end byte to just before the declaration or function.
        """
        s, e = node.start_byte, node.end_byte

        # Exporting a declaration; delete up until the start of the declaration
        decl_child = node.child_by_field_name("declaration")
        if decl_child:
            e = decl_child.start_byte

        # Exporting a value that is an anonymous function; delete up until the
        # start of the function. There is no point in keeping non-function
        # values, because there is nothing to type annotate
        val_child = node.child_by_field_name("value")
        if val_child and val_child.type == "function":
            e = val_child.start_byte

        return s, e

    QUERY = create_query("(export_statement) @export")
    tree = str_to_tree(content)
    captures = QUERY.captures(tree.root_node)
    pairs = [get_indices(c[0]) for c in captures]

    return delete_between_indices(content, pairs)

def strip_import_export(e):
    """
    Given a dataset example, update the content to strip imports/exports
    """
    stripped = strip_exports(e["content"])
    stripped = strip_imports(stripped)
    e["content"] = stripped
    return e

def gen(packages):
    # For each package, read and concatenate all the JavaScript files
    # We'll strip the imports/exports in a later step
    for p in packages:
        files = sorted([f.resolve() for f in p.rglob("*.js") if f.is_file()])
        file_contents = [f.read_text("utf-8") for f in files]

        name = p.parts[-1]
        content = "\n".join(file_contents)
        size = len(content.encode("utf-8"))

        yield {"name": name, "size": size, "content": content}

def main():
    args = parse_args()
    workers = args.workers
    dataset_dirs = args.dataset
    output_dir = args.output

    # Get the packages from the given datasets
    # Only take the packages that contain JavaScript files
    packages = sorted([p.resolve()
                       for d in dataset_dirs
                       for p in Path(d).resolve().iterdir()
                       if len(list(p.rglob("*.js")))])

    dataset = Dataset.from_generator(gen, gen_kwargs={"packages": packages})

    # Need to map in a separate step, because strip_import_export relies on
    # PARSER, which can't be pickled and used by from_generator
    dataset = dataset.map(strip_import_export, num_proc=workers)

    if output_dir:
        print("Saving result to", output_dir, flush=True)
        dataset.save_to_disk(output_dir, num_proc=workers)

if __name__ == "__main__":
    main()
