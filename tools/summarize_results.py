# This script parses the results and error output to produce summaries:
#   - Overall summary: did a package type check?
#       - package name
#       - dataset
#       - DeepTyper type checks?
#       - LambdaNet type checks?
#       - InCoder type checks?
#   - A summary for each (system, dataset) pair:
#       - package
#       - filename
#       - number of errors in that file

from pathlib import Path
import argparse

import util

SYSTEMS = ["DeepTyper", "LambdaNet", "InCoder"]

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

def typecheck_summary(data_dir, summary_csv):
    print("Generating summary of packages that typecheck...")
    datasets = sorted([d.parts[-1] for d in Path(data_dir, "original").iterdir()])

    with open(summary_csv, "w") as file:
        system_headers = [f'"{s} type checks"' for s in SYSTEMS]
        header = '"Dataset","Package",' + ",".join(system_headers)
        file.write(header)
        file.write("\n")

        for d in datasets:
            packages = sorted([p.parts[-1] for p in Path(data_dir, "original", d).iterdir()])
            for p in packages:
                res = [did_package_typecheck(data_dir, d, p, s) for s in SYSTEMS]
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

    for s in SYSTEMS:
        print(f"  {s} ...")
        output_csv = Path(data_dir, "notes", s, "errors_per_file.csv")
        with open(output_csv, "w") as file:
            file.write('Dataset,Package,File,"Number of errors"')
            file.write("\n")

            for d in datasets:
                print(f"    {d} ...")
                original_dataset = Path(data_dir, "original", d)
                ts_dataset = Path(data_dir, f"{s}-out", d, "baseline")

                packages = sorted([p.parts[-1] for p in ts_dataset.iterdir()])
                for p in packages:
                    entries = errors_per_file_for_package(data_dir, d, ts_dataset, p)
                    for e in entries:
                        file.write(e)
                        file.write("\n")

def main():
    args = parse_args()
    data_dir = Path(args.data).resolve()

    summary_csv = Path(data_dir, "notes", "typecheck_summary.csv")
    typecheck_summary(data_dir, summary_csv)

    errors_per_file_summary(data_dir)

if __name__ == "__main__":
    main()
