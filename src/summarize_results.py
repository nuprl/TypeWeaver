# This script parses the results and error output to produce summaries:
#   - Overall summary: did a package type check?
#       dataset, package, DeepTyper type checks, LambdaNet type checks, InCoder type checks
#   - A summary for each system
#       dataset, package, filename, num errors in that file
#   - Accuracy of type annotations, compared to ground truth type definitions
#       system, dataset, package, num sigs compared,
#       num correct annotations, num inferred any annotations,
#       num of non-any annotations checked, num of any ground truth annotations skipped
#   - Error codes per file, for each system
#       dataset, package, filename, error code, count

from concurrent import futures
from pathlib import Path
from subprocess import PIPE
from tqdm import tqdm
import argparse, json, os, re, shutil, subprocess

SYSTEMS = {
    "DeepTyper": "dt",
    "LambdaNet": "ln",
    "InCoder": "ic"
}

def check_exists(path):
    if not Path(path).exists():
        print(f"error: directory does not exist: {path}")
        exit(2)

def parse_args():
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

    args = parser.parse_args()
    check_exists(args.data)

    original = Path(args.data, "original")
    check_exists(original)
    csv = Path(args.data, "notes", "csv")
    csv.mkdir(parents=True, exist_ok=True)

    return args

def copy_loc(data_dir, csv_dir):
    original_loc = Path(data_dir, "notes", "original", "file_loc.csv")
    target_loc = Path(csv_dir, "file_loc.csv")

    shutil.copyfile(original_loc, target_loc)

def did_package_typecheck(data_dir, dataset, package, system):
    out_file = Path(data_dir, f"{system}-out", dataset, "baseline-checked", f"{package}.out")
    err_file = Path(data_dir, f"{system}-out", dataset, "baseline-checked", f"{package}.err")

    if out_file.exists():
        return "1"
    elif err_file.exists():
        return "0"
    else:
        return "NA"

def typecheck_summary(data_dir, csv_dir):
    summary_csv = Path(csv_dir, "typecheck_summary.csv")
    with open(summary_csv, "w") as file:
        system_headers = [f'"{s} type checks"' for s in SYSTEMS.keys()]
        header = '"Dataset","Package",' + ",".join(system_headers) + "\n"
        file.write(header)

        datasets = [d for d in Path(data_dir, "original").iterdir()]
        pairs = [(d.parts[-1], p.parts[-1])
                 for d in sorted(datasets)
                 for p in sorted(d.iterdir())]
        for d, p in tqdm(pairs, desc="Type check summary"):
            res = [did_package_typecheck(data_dir, d, p, s) for s in SYSTEMS.keys()]
            entry = ",".join([d, p, *res]) + "\n"
            file.write(entry)

def count_errors_in_file(err_file, src_file):
    count = 0
    with open(err_file) as f:
        for line in f:
            if line.startswith(str(src_file)):
                count += 1
    return str(count)

def errors_per_file_for_package(ts_dataset, package):
    package_dir = Path(ts_dataset, package)
    dataset = ts_dataset.parts[-2]
    out_file = Path(ts_dataset, "..", "baseline-checked", f"{package}.out").resolve()
    err_file = Path(ts_dataset, "..", "baseline-checked", f"{package}.err").resolve()
    entries = []

    files = sorted([f.relative_to(package_dir) for f in package_dir.rglob("*.ts")])
    for file in files:
        entry = f"{dataset},{package},{file},"

        if out_file.exists():
            entries.append(entry + "0")
        elif err_file.exists():
            entries.append(entry + count_errors_in_file(err_file, file))
    return entries

def errors_per_file_summary(data_dir, csv_dir):
    triples = []
    for s in SYSTEMS.keys():
        datasets = sorted([d for d in Path(data_dir, "original").iterdir()])
        for d in datasets:
            ts_dataset = Path(data_dir, f"{s}-out", d.parts[-1], "baseline")
            if not ts_dataset.exists():
                continue
            packages = sorted([p for p in ts_dataset.iterdir()])
            for p in packages:
                triples.append((s, ts_dataset, p.parts[-1]))

    for s in SYSTEMS.keys():
        output_csv = Path(csv_dir, f"errors_per_file.{SYSTEMS[s]}.csv")
        with open(output_csv, "w") as file:
            file.write('Dataset,Package,File,"Number of errors"\n')

    for s, ts_dataset, p in tqdm(triples, desc="Error counts"):
        output_csv = Path(csv_dir, f"errors_per_file.{SYSTEMS[s]}.csv")
        with open(output_csv, "a") as file:
            entries = errors_per_file_for_package(ts_dataset, p)
            for e in entries:
                file.write(e + "\n")

def clean_type(t):
    t = re.sub("typeof", "", t)
    t = re.sub("readonly", "", t)
    return t.strip()

def get_param_type(string):
    def clean_param(p):
        # Split on : and remove the first part
        # Annotations may contain : if it's a function or struct type
        t = ":".join(p.split(":")[1:])
        return clean_type(t)

    res = [clean_param(p) for p in string.split(",")]
    if len(res) == 1 and not res[0]:
        return []
    else:
        return res

def read_function_signatures(package):
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
                    params = get_param_type(matches.group(2))
                    return_type = clean_type(matches.group(3))

                    # Key encoding: <name>@<num params>
                    # Value encoding: return type is last element of list
                    key = f"{name}@{len(params)}"
                    signatures[key] = [*params, return_type]
    return signatures

def compare_annotations(inferred, truth):
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

def compute_accuracy_for_package(data_dir, ts_dataset, package, debug = False):
    groundtruth_dir = Path(data_dir, "groundtruth", package)
    package_dir = Path(ts_dataset, package)

    ground_truth_sigs = read_function_signatures(groundtruth_dir)
    inferred_sigs = read_function_signatures(package_dir)

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
                c, ia, n, ta = compare_annotations(i, t)
                correct += c
                inferred_anys += ia
                total += n
                truth_anys += ta

    ### Code to print out signature comparisons
    if debug:
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

    return f"{num_signatures},{correct},{inferred_anys},{total},{truth_anys}"

def compute_accuracy(data_dir, csv_dir, debug = False):
    triples = []
    for s in SYSTEMS.keys():
        datasets = sorted([d for d in Path(data_dir, "original").iterdir()])
        for d in datasets:
            ts_dataset = Path(data_dir, f"{s}-out", d.parts[-1], "baseline-typedefs")
            if not ts_dataset.exists():
                continue
            packages = sorted([p for p in ts_dataset.iterdir()])
            for p in packages:
                triples.append((s, ts_dataset, p.parts[-1]))

    accuracy_csv = Path(csv_dir, "accuracy_summary.csv")
    with open(accuracy_csv, "w") as file:
        file.write('"System","Dataset","Package","Number of function signatures compared","Number of correct annotations","Number of inferred anys","Number of annotations checked","Number of ground truth anys skipped"\n')
        for s, ts_dataset, p in tqdm(triples, desc="Accuracy"):
            res = compute_accuracy_for_package(data_dir, ts_dataset, p, debug)
            file.write(f"{s.lower()},{ts_dataset.parts[-2]},{p},{res}\n")

def error_codes_for_package(ts_dataset, package):
    # Regex for matching error messages
    #   <filename.ts>(row,col): error <TScode>
    # negative lookahead so we don't match if file starts with .., but we want to match .
    ERROR_CODES_RE = re.compile("^((?!\.\.).*\.ts)\(\d+,\d+\): error (TS\d+):")

    package_dir = Path(ts_dataset, package)
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
            entries.append(f"{ts_dataset.parts[-2]},{package},{filename},{code},{count}")

    return entries

def count_error_codes(data_dir):
    triples = []
    for s in SYSTEMS.keys():
        datasets = sorted([d for d in Path(data_dir, "original").iterdir()])
        for d in datasets:
            ts_dataset = Path(data_dir, f"{s}-out", d.parts[-1], "baseline")
            if not ts_dataset.exists():
                continue
            packages = sorted([p for p in ts_dataset.iterdir()])
            for p in packages:
                triples.append((s, ts_dataset, p.parts[-1]))

    for s in SYSTEMS.keys():
        output_csv = Path(data_dir, "notes", "csv", f"error_codes.{SYSTEMS[s]}.csv")
        with open(output_csv, "w") as file:
            file.write('Dataset,Package,File,"Error code",Count\n')

    for s, ts_dataset, p in tqdm(triples, desc="Error codes"):
        output_csv = Path(data_dir, "notes", "csv", f"error_codes.{SYSTEMS[s]}.csv")
        with open(output_csv, "a") as file:
            entries = error_codes_for_package(ts_dataset, p)
            for e in entries:
                file.write(e + "\n")

def main():
    args = parse_args()
    data_dir = Path(args.data).resolve()
    csv_dir = Path(data_dir, "notes", "csv")

    # Copy dataset loc from notes
    copy_loc(data_dir, csv_dir)

    typecheck_summary(data_dir, csv_dir)
    errors_per_file_summary(data_dir, csv_dir)
    compute_accuracy(data_dir, csv_dir, args.debug)
    count_error_codes(data_dir)

if __name__ == "__main__":
    main()
