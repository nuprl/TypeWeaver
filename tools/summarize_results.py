# This script parses the results and error output to produce summaries:
#   - Overall summary: did a package type check?
#       - dataset
#       - package name
#       - DeepTyper type checks?
#       - LambdaNet type checks?
#       - InCoder type checks?
#   - A summary for each (system, dataset) pair:
#       - package
#       - filename
#       - number of errors in that file
#   - Accuracy of type annotations, compared to ground truth type definitions
#       - system
#       - dataset
#       - package name
#       - number of function signatures compared
#       - number of correct annotations
#       - number of inferred any annotations
#       - number of non-any annotations checked
#       - number of any ground truth annotations skipped

from pathlib import Path
import argparse, re

import util

# Regex for matching function declarations
#   function <name>(<params>): <return type>
FUNCTION_DECL_RE = re.compile("^.*function\s+([a-zA-Z_$][\w_$]*)\((.*)\):\s*([^;]*);?$")

SYSTEMS = {
    "DeepTyper": "dt",
    "LambdaNet": "ln",
    "InCoder": "ic"
}

def parse_args():
    parser = argparse.ArgumentParser(description="Summarizes results")
    parser.add_argument(
        "--data",
        required=True,
        help="data directory that contains dataset output and notes")

    args = parser.parse_args()
    util.check_exists(args.data)

    original = Path(args.data, "original")
    util.check_exists(original)
    notes = Path(args.data, "notes")
    util.check_exists(notes)

    return args

def did_package_typecheck(data_dir, dataset, package, system):
    out_file = Path(data_dir, f"{system}-out", dataset, "baseline-checked", f"{package}.out")
    err_file = Path(data_dir, f"{system}-out", dataset, "baseline-checked", f"{package}.err")

    if out_file.exists():
        return "1"
    elif err_file.exists():
        return "0"
    else:
        return "NA"

def typecheck_summary(data_dir):
    summary_csv = Path(data_dir, "notes", "csv", "typecheck_summary.csv")

    print("Generating summary of packages that typecheck...")
    datasets = sorted([d.parts[-1] for d in Path(data_dir, "original").iterdir()])

    with open(summary_csv, "w") as file:
        system_headers = [f'"{s} type checks"' for s in SYSTEMS.keys()]
        header = '"Dataset","Package",' + ",".join(system_headers)
        file.write(header)
        file.write("\n")

        for d in datasets:
            packages = sorted([p.parts[-1] for p in Path(data_dir, "original", d).iterdir()])
            for p in packages:
                res = [did_package_typecheck(data_dir, d, p, s) for s in SYSTEMS.keys()]
                entry = ",".join([d, p, *res])
                file.write(entry)
                file.write("\n")

def count_errors_in_file(err_file, src_file):
    count = 0
    with open(err_file) as f:
        for line in f:
            if line.startswith(str(src_file)):
                count += 1
    return str(count)

def errors_per_file_for_package(data_dir, dataset, ts_dataset, package):
    package_dir = Path(ts_dataset, package)
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

def errors_per_file_summary(data_dir):
    print("Counting errors per file, for each system and dataset...")
    datasets = sorted([d.parts[-1] for d in Path(data_dir, "original").iterdir()])

    for s in SYSTEMS.keys():
        print(f"  {s}...")
        output_csv = Path(data_dir, "notes", "csv", f"errors_per_file.{SYSTEMS[s]}.csv")
        with open(output_csv, "w") as file:
            file.write('Dataset,Package,File,"Number of errors"\n')

            for d in datasets:
                print(f"    {d}...")
                ts_dataset = Path(data_dir, f"{s}-out", d, "baseline")

                packages = sorted([p.parts[-1] for p in ts_dataset.iterdir()])
                for p in packages:
                    entries = errors_per_file_for_package(data_dir, d, ts_dataset, p)
                    for e in entries:
                        file.write(e)
                        file.write("\n")

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
    signatures = dict()
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

def compute_accuracy_for_package(data_dir, dataset, ts_dataset, package):
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
    # if num_signatures > 0:
    #     print("*" * 80)
    #     print(package_dir)
    #     for k, inferred in inferred_sigs.items():
    #         if k in ground_truth_sigs.keys():
    #             truth = ground_truth_sigs[k]
    #             print(k)
    #             print("\tInferred\tGround truth\t\tMatch?")
    #             for i, t in zip(inferred, truth):
    #                 if i == t:
    #                     match = 1
    #                 else:
    #                     match = 0
    #                 print(f"\t{i:16}{t:24}{match}")
    #     print("Sigs:", num_signatures, "Correct types:", correct, "Total:", total, "Inferred anys:", inferred_anys, "Truth anys:", truth_anys)

    return f"{num_signatures},{correct},{inferred_anys},{total},{truth_anys}"

def compute_accuracy(data_dir):
    accuracy_csv = Path(data_dir, "notes", "csv", "accuracy_summary.csv")

    print("Computing accuracy per package, for each system and dataset...")
    datasets = sorted([d.parts[-1]
                       for d in Path(data_dir, "original").iterdir()
                       if not "untyped" in str(d) and str(d).endswith("es6")])
    ground_truth = Path(data_dir, "groundtruth")

    with open(accuracy_csv, "w") as file:
        file.write('"System","Dataset","Package","Number of function signatures compared","Number of correct annotations","Number of inferred anys","Number of annotations checked","Number of ground truth anys skipped"\n')
        for s in SYSTEMS.keys():
            print(f"  {s}...")
            for d in datasets:
                print(f"    {d}...")
                ts_dataset = Path(data_dir, f"{s}-out", d, "baseline-typedefs")

                packages = sorted([p.parts[-1] for p in ts_dataset.iterdir()])
                for p in packages:
                    res = compute_accuracy_for_package(data_dir, d, ts_dataset, p)
                    file.write(f"{s.lower()},{d},{p},")
                    file.write(res)
                    file.write("\n")

def main():
    args = parse_args()
    data_dir = Path(args.data).resolve()

    typecheck_summary(data_dir)
    errors_per_file_summary(data_dir)
    compute_accuracy(data_dir)

if __name__ == "__main__":
    main()
