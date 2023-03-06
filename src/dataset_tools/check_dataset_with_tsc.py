# This script checks that a dataset (JS or TS) is syntactically valid

from concurrent import futures
from pathlib import Path
from subprocess import PIPE
from tqdm import tqdm
import argparse, os, subprocess

import util

TSC_PATH = Path(Path(__file__).parent, "node_modules", ".bin", "tsc").resolve()
if not Path(TSC_PATH).exists():
    print("Could not find cloc: {}".format(TSC_PATH))
    exit(1)

def parse_args():
    cpu_count = os.cpu_count();

    parser = argparse.ArgumentParser(description="Checks if packages are syntactically valid")
    parser.add_argument(
        "--dataset",
        required=True,
        help="name of directory that contains JavaScript packages")
    parser.add_argument(
        "--output",
        required=True,
        help="output directory to save results")
    parser.add_argument(
        "--workers",
        type=int,
        default=cpu_count,
        help=f"maximum number of workers to use, defaults to {cpu_count}, the number of processors on the machine")

    args = parser.parse_args()
    util.check_exists(args.dataset)
    util.check_exists(args.output)

    return args

def check_package(dataset_dir, output_dir, package):
    path = Path(dataset_dir, package)
    js_files = [f.relative_to(path) for f in path.rglob("*.js") if f.is_file()]
    ts_files = [f.relative_to(path) for f in path.rglob("*.ts")
                if f.is_file() and len(f.suffixes) == 1]
    files = js_files + ts_files

    out_file = Path(output_dir, f"{package}.out").resolve()
    err_file = out_file.with_suffix(".err")
    warn_file = out_file.with_suffix(".warn")

    args = [TSC_PATH, "--allowJS", "--noEmit", "--esModuleInterop", "--lib", "es2021", *files]
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=path)

    if result.returncode == 0:
        # tsc prints errors and warnings to stdout
        if result.stdout:
            with open(warn_file, mode="w", encoding="utf-8") as f:
                print(result.stdout, file=f)
        out_file.touch()
        return True
    else:
        # tsc prints errors and warnings to stdout
        if result.stdout:
            with open(err_file, mode="w", encoding="utf-8") as f:
                print(result.stdout, file=f)
        return False

def main():
    args = parse_args()

    dataset_dir = Path(args.dataset).resolve()
    output_dir = Path(args.output).resolve()
    packages = sorted([p.relative_to(dataset_dir)
                       for p in dataset_dir.iterdir()])

    output = Path(output_dir, dataset_dir.parts[-1])
    output.mkdir(parents=True, exist_ok=True)

    total = len(packages)
    success = 0

    with futures.ProcessPoolExecutor(max_workers=args.workers) as executor:
        fs = [executor.submit(check_package, dataset_dir, output, package)
              for package in packages]
        for f in tqdm(fs, unit="pkg", miniters=1):
            result = f.result()
            success += int(result)

    failed = total - success

    print(f"    Out of {total} packages, {success} succeeded, {failed} failed")



if __name__ == "__main__":
    main()
