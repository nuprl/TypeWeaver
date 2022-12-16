# This script uses cloc to compute the lines of code per file, for each package
# The format is:
#   dataset, package, filename, lines of code

from concurrent import futures
from pathlib import Path
from subprocess import PIPE
from tqdm import tqdm
import argparse, json, os, subprocess

import util

def parse_args():
    cpu_count = os.cpu_count();

    parser = argparse.ArgumentParser(description="Summarizes results")
    parser.add_argument(
        "--data",
        required=True,
        help="data directory that contains dataset output and notes")
    parser.add_argument(
        "--output",
        required=True,
        help="output file to write results")
    parser.add_argument(
        "--workers",
        type=int,
        default=cpu_count,
        help=f"maximum number of workers to use, defaults to {cpu_count}, the number of processors on the machine")

    args = parser.parse_args()
    util.check_exists(args.data)

    original = Path(args.data, "original")
    util.check_exists(original)

    return args

def get_loc_for_package(data_dir, dataset, package):
    dataset_name = dataset.parts[-1]
    package_name = package.parts[-1]
    res = []

    args = ["cloc", "--include-ext=js", "--json", "--by-file", "--skip-uniqueness", "."]
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=package)
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

def main():
    args = parse_args()
    data_dir = Path(args.data).resolve()
    output = Path(args.output).resolve()

    print("Calculating LOC for each file in each package...")
    datasets = sorted([d for d in Path(data_dir, "original").iterdir()])

    with open(output, "w") as file:
        file.write('Dataset,Package,File,"Lines of code"\n')
        with futures.ProcessPoolExecutor(max_workers=args.workers) as executor:
            fs = [executor.submit(get_loc_for_package, data_dir, d, p)
                  for d in sorted(datasets)
                  for p in sorted(d.iterdir())]
            for f in tqdm(fs):
                result = f.result()
                for r in result:
                    file.write(r)
                    file.write("\n")

if __name__ == "__main__":
    main()
