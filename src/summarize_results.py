# This script parses the results and error output to produce summaries:
#   - typecheck.system.csv (does a package type check?)
#       system, dataset, package, type checks
#   - error.system.csv (counting the kinds of errors per file)
#       system, dataset, package, file, error code, count
#   - accuracy.system.csv (comparing type annotations against ground truth)
#       system, dataset, package, num sigs compared,
#       num correct annotations, num inferred any annotations,
#       num of non-any annotations checked, num of any ground truth annotations skipped
#   - annotation.system.csv (counting trivial annotations)
#       system, dataset, package, filename, number of anys, number of any[], number of Function, number of annotations

from concurrent import futures
from pathlib import Path
from subprocess import PIPE
from tqdm import tqdm
from tree_sitter import Language, Parser, Node, Tree
import argparse, json, os, re, shutil, subprocess

SYSTEMS = {
    "DeepTyper": "dt",
    "LambdaNet": "ln",
    "InCoder": "ic",
    "SantaCoder": "sc"
}

Language.build_library(
    f"{Path(__file__).parent}/build/languages.so",
    [f"{Path(__file__).parent}/tree-sitter-typescript/typescript"]
)
TS_LANGUAGE = Language(f"{Path(__file__).parent}/build/languages.so", 'typescript')
PARSER = Parser()
PARSER.set_language(TS_LANGUAGE)

class Summarizer:
    def __init__(self, args):
        self.data_dir = Path(args.data).resolve()
        self.csv_dir = Path(self.data_dir, "notes", "csv")
        self.triples = self._system_dataset_package_triples()
        self.containers = not args.no_containers
        self.debug = args.debug
        self.workers = args.workers

    def _system_dataset_package_triples(self, subdir = "baseline"):
        triples = []
        for s in SYSTEMS.keys():
            datasets = sorted([d for d in Path(self.data_dir, "original").iterdir()])
            for d in datasets:
                ts_dataset = Path(self.data_dir, f"{s}-out", d.parts[-1], subdir)
                if not ts_dataset.exists():
                    continue
                packages = sorted([p for p in ts_dataset.iterdir()])
                for p in packages:
                    triples.append((s, ts_dataset, p.parts[-1]))
        return triples

    def _prepare_headers(self, filename, header):
        for system, s in SYSTEMS.items():
            if not Path(self.data_dir, f"{system}-out").exists():
                continue
            output_csv = Path(self.csv_dir, f"{filename}.{s}.csv")
            with open(output_csv, "w") as file:
                file.write(header + "\n")

    def _iterate_triples(self, triples, desc, file_prefix, iterate_package):
        file_handles = {}
        for system, s in SYSTEMS.items():
            if not Path(self.data_dir, f"{system}-out").exists():
                continue
            filename = f"{file_prefix}.{s}.csv"
            output_csv = Path(self.csv_dir, filename)
            file_handles[filename] = open(output_csv, "a")

        with futures.ProcessPoolExecutor(max_workers=self.workers) as executor:
            fs = [executor.submit(iterate_package, file_prefix, s, d, p)
                  for s, d, p in triples]
            for future in tqdm(fs, desc):
                entries, filename = future.result()
                file = file_handles[filename]
                for e in entries:
                    file.write(e + "\n")

        for f in file_handles.values():
            f.close()

    def copy_loc(self):
        original_loc = Path(self.data_dir, "notes", "original", "file_loc.csv")
        target_loc = Path(self.csv_dir, "file_loc.csv")

        shutil.copyfile(original_loc, target_loc)

    def _typechecks_per_package(self, file_prefix, system, ts_dataset, package_out):
        # result of type checking
        # extension is .out if package type checked, .err otherwise
        output = Path(ts_dataset, package_out)

        dataset = ts_dataset.parts[-2]
        package = Path(package_out).with_suffix("")
        result = "1" if output.suffix == ".out" else "0"

        entries = [f"{system},{dataset},{package},{result}"]
        filename = f"{file_prefix}.{SYSTEMS[system]}.csv"

        return entries, filename

    def typecheck_summary(self):
        triples = self._system_dataset_package_triples("baseline-checked")
        self._prepare_headers("typecheck",
                              '"System","Dataset","Package","Type checks"')
        self._iterate_triples(triples, "Type checks", "typecheck",
                              self._typechecks_per_package)

    def _errors_per_package(self, file_prefix, system, ts_dataset, package):
        # Regex for matching error messages
        #   <filename.ts>(row,col): error <TScode>
        # negative lookahead so we don't match if file starts with .., but we want to match .
        ERROR_CODES_RE = re.compile("^((?!\.\.).*\.ts)\(\d+,\d+\): error (TS\d+):")

        dataset = ts_dataset.parts[-2]
        output_file = f"{file_prefix}.{SYSTEMS[system]}.csv"
        err_file = Path(ts_dataset, "..", "baseline-checked", f"{package}.err").resolve()
        entries = []
        errors = {}

        if err_file.exists():
            with open(err_file, encoding="utf-8") as f:
                for line in f:
                    matches = ERROR_CODES_RE.match(line)
                    if matches:
                        filename = matches.group(1)
                        code = matches.group(2)
                        if filename in errors:
                            file_map = errors[filename]
                            file_map.setdefault(code, 0)
                            file_map[code] += 1
                        else:
                            errors[filename] = {code: 1}

        for filename, file_map in errors.items():
            for code, count in file_map.items():
                entries.append(f"{system},{dataset},{package},{filename},{code},{count}")

        return entries, output_file

    def error_summary(self):
        self._prepare_headers("error",
                              '"System","Dataset","Package","File","Error code","Count"')
        self._iterate_triples(self.triples, "Errors", "error",
                              self._errors_per_package)

    def _clean_type(self, t):
        t = re.sub("typeof", "", t)
        t = re.sub("readonly", "", t)
        return t.strip()

    def _get_param_type(self, string):
        def clean_param(p):
            # Split on : and remove the first part
            # Annotations may contain : if it's a function or struct type
            t = ":".join(p.split(":")[1:])
            return self._clean_type(t)

        res = [clean_param(p) for p in string.split(",")]
        if len(res) == 1 and not res[0]:
            return []
        else:
            return res

    def _read_function_signatures(self, package):
        # Regex for matching function declarations
        #   function <name>(<params>): <return type>
        FUNCTION_DECL_RE = re.compile("^.*function\s+([a-zA-Z_$][\w_$]*)\((.*)\):\s*([^;]*);?$")

        signatures = {}
        files = [f for f in package.rglob("*.d.ts")]
        for f in files:
            with open(f, encoding="utf-8") as f:
                for line in f:
                    matches = FUNCTION_DECL_RE.match(line)
                    if matches:
                        name = matches.group(1)
                        params = self._get_param_type(matches.group(2))
                        return_type = self._clean_type(matches.group(3))

                        # Key encoding: <name>@<num params>
                        # Value encoding: return type is last element of list
                        key = f"{name}@{len(params)}"
                        signatures[key] = [*params, return_type]
        return signatures

    def _compare_annotations(self, inferred, truth):
        correct, inferred_anys, total, truth_anys = [0, 0, 0, 0]
        if inferred == "any":
            inferred_anys += 1
        if truth == "any":
            truth_anys += 1
        else:
            total += 1
            if truth == inferred:
                correct += 1
        return [correct, inferred_anys, total, truth_anys]

    def _accuracy_per_package(self, file_prefix, system, ts_dataset, package):
        groundtruth_dir = Path(self.data_dir, "groundtruth", package)
        package_dir = Path(ts_dataset, package)
        dataset = ts_dataset.parts[-2]

        ground_truth_sigs = self._read_function_signatures(groundtruth_dir)
        inferred_sigs = self._read_function_signatures(package_dir)

        # Loop over all inferred signatures and compare to ground truth signatures
        # Inferred annotations must match ground truth annotations exactly
        # Skip ground truth annotation if it is "any"
        # Skip cases where a signature is missing from the other set
        # (e.g. no ground truth exists, or no inferred signature exists)
        num_signatures = 0
        correct = 0
        inferred_anys = 0
        total = 0
        truth_anys = 0
        for k, inferred in inferred_sigs.items():
            if k in ground_truth_sigs.keys():
                num_signatures += 1
                truth = ground_truth_sigs[k]
                for i, t in zip(inferred, truth):
                    c, ia, n, ta = self._compare_annotations(i, t)
                    correct += c
                    inferred_anys += ia
                    total += n
                    truth_anys += ta

        ### Code to print out signature comparisons
        if self.debug:
            if num_signatures > 0:
                print("*" * 80)
                print(package_dir)
                for k, inferred in inferred_sigs.items():
                    if k in ground_truth_sigs.keys():
                        truth = ground_truth_sigs[k]
                        print(k)
                        print("\tInferred\tGround truth\t\tMatch?")
                        for i, t in zip(inferred, truth):
                            if i == t:
                                match = 1
                            else:
                                match = 0
                            print(f"\t{i:16}{t:24}{match}")
                print("Sigs:", num_signatures, "Correct types:", correct, "Total:", total, "Inferred anys:", inferred_anys, "Truth anys:", truth_anys)

        output_file = f"{file_prefix}.{SYSTEMS[system]}.csv"
        entries = [f"{system},{dataset},{package},{num_signatures},{correct},{inferred_anys},{total},{truth_anys}"]

        return entries, output_file

    def accuracy_summary(self):
        # TODO: use parser to compare declarations?
        triples = self._system_dataset_package_triples("baseline-typedefs")
        self._prepare_headers("accuracy",
                              '"System","Dataset","Package","Number of function signatures compared","Number of correct annotations","Number of inferred anys","Number of annotations checked","Number of ground truth anys skipped"')
        self._iterate_triples(triples, "Accuracy", "accuracy",
                             self._accuracy_per_package)

    def _annotations_for_file(self, file_prefix, system, ts_dataset, package, file):
        package_dir = Path(ts_dataset, package)
        dataset = ts_dataset.parts[-2]
        output_file = f"{file_prefix}.{SYSTEMS[system]}.csv"
        entry = f"{system},{dataset},{package},{file},0,0,0,0"

        query = TS_LANGUAGE.query("(type_annotation) @annotation")

        content_bytes = Path(package_dir, file).read_bytes()
        tree = PARSER.parse(content_bytes)
        annotations = [c[0].named_children[0].text.decode("utf-8")
                       for c in query.captures(tree.root_node)]

        num_any = len([ann for ann in annotations if ann == "any"])
        num_arr = len([ann for ann in annotations
                       if ann == "any[]" or ann == "Array<any>"])
        num_fun = len([ann for ann in annotations if ann == "Function"])
        total = len(annotations)

        entry = f"{system},{dataset},{package},{file},{num_any},{num_arr},{num_fun},{total}"

        return entry, output_file

    def annotation_summary(self):
        self._prepare_headers("annotation",
                              '"System","Dataset","Package","File","Number of anys","Number of any[]","Number of Function","Total annotations"')

        # Don't use _iterate_triples because we want a worker per file, not per package
        inputs = [(s, td, p, str(f))
                for s, td, p in self.triples
                for pd in [Path(td, p)]
                for f in sorted([f.relative_to(pd) for f in pd.rglob("*.ts")])]
        file_handles = {}
        for system, s in SYSTEMS.items():
            if not Path(self.data_dir, f"{system}-out").exists():
                continue
            filename = f"annotation.{s}.csv"
            output_csv = Path(self.csv_dir, filename)
            file_handles[filename] = open(output_csv, "a")

        with futures.ProcessPoolExecutor(max_workers=self.workers) as executor:
            fs = [executor.submit(self._annotations_for_file, "annotation", s, td, p, f)
                for s, td, p, f in inputs]
            for future in tqdm(fs, "Annotations"):
                entry, filename = future.result()
                file = file_handles[filename]
                file.write(entry + "\n")

        for f in file_handles.values():
            f.close()

def parse_args():
    def check_exists(path):
        if not Path(path).exists():
            print(f"error: directory does not exist: {path}")
            exit(2)

    cpu_count = os.cpu_count();

    parser = argparse.ArgumentParser(description="Summarizes results")
    parser.add_argument(
        "--data",
        required=True,
        help="data directory that contains dataset output and notes")
    parser.add_argument(
        "--debug",
        action="store_true",
        help="print extra output for debugging")
    parser.add_argument(
        "--workers",
        type=int,
        default=cpu_count,
        help=f"maximum number of workers to use, defaults to {cpu_count}, the number of processors on the machine")
    parser.add_argument(
        "--no-containers",
        default=False,
        action="store_true",
        help="run tools without using containers")

    args = parser.parse_args()
    check_exists(args.data)

    original = Path(args.data, "original")
    check_exists(original)
    csv = Path(args.data, "notes", "csv")
    csv.mkdir(parents=True, exist_ok=True)

    return args

def main():
    args = parse_args()
    summarizer = Summarizer(args)

    # Copy dataset loc from notes
    summarizer.copy_loc()

    summarizer.typecheck_summary()
    summarizer.error_summary()
    summarizer.accuracy_summary()
    summarizer.annotation_summary()

if __name__ == "__main__":
    main()
