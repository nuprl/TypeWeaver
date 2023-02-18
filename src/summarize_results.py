# This script parses the results and error output to produce summaries:
#   - Overall summary: did a package type check?
#       dataset, package, DeepTyper type checks, LambdaNet type checks, InCoder type checks
#   - A summary for each system
#       dataset, package, filename, num errors in that file
#   - Accuracy of type annotations, compared to ground truth type definitions
#       system, dataset, package, num sigs compared,
#       num correct annotations, num inferred any annotations,
#       num of non-any annotations checked, num of any ground truth annotations skipped
#   - Lines of code, computed with cloc
#       dataset, package, filename, lines of code
#   - Error codes per file, for each system
#       dataset, package, filename, error code, count
#   - Annotations per file, for each system
#       dataset, package, filename, number of anys, number of any[], number of Function, number of annotations

from concurrent import futures
from pathlib import Path
from subprocess import PIPE
import argparse, json, os, re, subprocess

# Regex for matching function declarations
#   function <name>(<params>): <return type>
FUNCTION_DECL_RE = re.compile("^.*function\s+([a-zA-Z_$][\w_$]*)\((.*)\):\s*([^;]*);?$")

# Regex for matching error messages
#   <filename.ts>(row,col): error <TScode>
# negative lookahead so we don't match if file starts with .., but we want to match .
ERROR_CODES_RE = re.compile("^((?!\.\.).*\.ts)\(\d+,\d+\): error (TS\d+):")

SYSTEMS = {
    "DeepTyper": "dt",
    "LambdaNet": "ln",
    "InCoder": "ic"
}

CLOC = Path(Path(__file__).parent, "weaver", "cloc").resolve()
COUNT_ANNS = Path(Path(__file__).parent, "weaver", "count_annotations").resolve()

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
        "--workers",
        type=int,
        default=cpu_count,
        help=f"maximum number of workers to use, defaults to {cpu_count}, the number of processors on the machine")

    args = parser.parse_args()
    check_exists(args.data)

    original = Path(args.data, "original")
    check_exists(original)
    csv = Path(args.data, "csv")
    csv.mkdir(parents=True, exist_ok=True)

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
    summary_csv = Path(data_dir, "csv", "typecheck_summary.csv")

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
        output_csv = Path(data_dir, "csv", f"errors_per_file.{SYSTEMS[s]}.csv")
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

def compute_accuracy_for_package(data_dir, dataset, ts_dataset, package, debug = False):
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

def compute_accuracy(data_dir, debug = False):
    accuracy_csv = Path(data_dir, "csv", "accuracy_summary.csv")

    print("Computing accuracy per package, for each system and dataset...")
    datasets = sorted([d.parts[-1] for d in Path(data_dir, "original").iterdir()])
    ground_truth = Path(data_dir, "groundtruth")

    with open(accuracy_csv, "w") as file:
        file.write('"System","Dataset","Package","Number of function signatures compared","Number of correct annotations","Number of inferred anys","Number of annotations checked","Number of ground truth anys skipped"\n')
        for s in SYSTEMS.keys():
            print(f"  {s}...")
            for d in datasets:
                ts_dataset = Path(data_dir, f"{s}-out", d, "baseline-typedefs")
                if not ts_dataset.exists():
                    continue
                print(f"    {d}...")

                packages = sorted([p.parts[-1] for p in ts_dataset.iterdir()])
                for p in packages:
                    res = compute_accuracy_for_package(data_dir, d, ts_dataset, p, debug)
                    file.write(f"{s.lower()},{d},{p},")
                    file.write(res)
                    file.write("\n")

def get_loc_for_package(data_dir, dataset, package):
    dataset_name = dataset.parts[-1]
    package_name = package.parts[-1]
    res = []

    # Set the container's working directory by setting an environment variable
    my_env = os.environ.copy()
    my_env["TYPEWEAVER_CLOC_WORKDIR"] = Path("/data", package.relative_to(data_dir.parent))

    args = [CLOC, "--include-ext=js", "--json", "--by-file", "--skip-uniqueness", "."]
    result = subprocess.run(args, env=my_env, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=CLOC.parent)
    if len(result.stdout) > 0:
        data = json.loads(result.stdout)
        if data:
            for f in sorted(data.keys()):
                if f == "header" or f == "SUM":
                    continue
                loc = data[f]["code"]
                # change to ".ts" extension, remove "./" prefix
                filename = str(Path(f).with_suffix(".ts"))
                res.append(f"{dataset_name},{package_name},{filename},{loc}")
    return res

def get_loc(data_dir, workers):
    file_loc_csv = Path(data_dir, "csv", "file_loc.csv")

    print("Calculating LOC for each file in each package...")
    datasets = sorted([d for d in Path(data_dir, "original").iterdir()])

    with open(file_loc_csv, "w") as file:
        file.write('Dataset,Package,File,"Lines of code"\n')
        with futures.ProcessPoolExecutor(max_workers=workers) as executor:
            fs = [executor.submit(get_loc_for_package, data_dir, d, p)
                  for d in sorted(datasets)
                  for p in sorted(d.iterdir())]
            for f in fs:
                result = f.result()
                for r in result:
                    file.write(r)
                    file.write("\n")

def error_codes_for_package(data_dir, dataset, ts_dataset, package):
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
            entries.append(f"{dataset},{package},{filename},{code},{count}")

    return entries

def count_error_codes(data_dir):
    print("Counting error codes per file, for each system and dataset...")
    datasets = sorted([d.parts[-1] for d in Path(data_dir, "original").iterdir()])

    for s in SYSTEMS.keys():
        print(f"  {s}...")
        output_csv = Path(data_dir, "csv", f"error_codes.{SYSTEMS[s]}.csv")
        with open(output_csv, "w") as file:
            file.write('Dataset,Package,File,"Error code",Count\n')

            for d in datasets:
                print(f"    {d}...")
                ts_dataset = Path(data_dir, f"{s}-out", d, "baseline")

                packages = sorted([p.parts[-1] for p in ts_dataset.iterdir()])
                for p in packages:
                    entries = error_codes_for_package(data_dir, d, ts_dataset, p)
                    for e in entries:
                        file.write(e)
                        file.write("\n")

def annotations_for_package(data_dir, dataset, ts_dataset, package):
    package_dir = Path(ts_dataset, package)
    entries = []

    files = sorted([f.relative_to(package_dir) for f in package_dir.rglob("*.ts")])
    for file in files:
        containerized_file = Path("/data", Path(package_dir, file).relative_to(data_dir.parent))
        args = [COUNT_ANNS, containerized_file]
        result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=COUNT_ANNS.parent)
        if len(result.stdout) > 0:
            data = json.loads(result.stdout)
            if data:
                entries.append(f'{dataset},{package},{file},{data["anys"]},{data["anyArrays"]},{data["functionTypes"]},{data["total"]}')

    return entries

def count_annotations(data_dir, workers):
    print("Counting annotations per file, for each system and dataset...")
    datasets = sorted([d.parts[-1] for d in Path(data_dir, "original").iterdir()])

    for s in SYSTEMS.keys():
        print(f"  {s}...")
        output_csv = Path(data_dir, "csv", f"annotations_per_file.{SYSTEMS[s]}.csv")
        with open(output_csv, "w") as file:
            file.write('Dataset,Package,File,"Number of anys","Number of any[]","Number of Function","Total annotations"\n')

            for d in datasets:
                print(f"    {d}...")
                ts_dataset = Path(data_dir, f"{s}-out", d, "baseline")

                packages = sorted([p.parts[-1] for p in ts_dataset.iterdir()])
                for p in packages:
                    entries = annotations_for_package(data_dir, d, ts_dataset, p)
                    for e in entries:
                        file.write(e)
                        file.write("\n")

def main():
    args = parse_args()
    data_dir = Path(args.data).resolve()

    typecheck_summary(data_dir)
    errors_per_file_summary(data_dir)
    compute_accuracy(data_dir)
    # Don't need to run this every time, it computes on the original dataset and is slow!
    get_loc(data_dir, args.workers)
    count_error_codes(data_dir)
    count_annotations(data_dir, args.workers)

if __name__ == "__main__":
    main()
