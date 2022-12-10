# This script runs cjs-to-es6 on a JavaScript dataset, to migrate each package
# from CommonJS modules to ECMAScript 6 modules. This more-or-less means
# changing require to import and module.export to export.
# We use this Python script to:
#   1. Copy the directory over
#   2. Run cjs-to-es6, which modifies in place
#   3. Record successes/failures
#   4. Delete failed migration attempts

from enum import Enum
from pathlib import Path
from subprocess import PIPE
import argparse, shutil, subprocess

class ResultStatus(Enum):
    OK = 0
    FAIL = 1
    SKIP = 2

CJS_TO_ES6_PATH = Path(Path(__file__).parent, "node_modules", ".bin", "cjs-to-es6").resolve()
if not Path(CJS_TO_ES6_PATH).exists():
    print("Could not find cjs-to-es6 script: {}".format(CJS_TO_ES6_PATH))
    exit(1)

def parse_args():
    parser = argparse.ArgumentParser(description="Migrates a JavaScript dataset from CommonJS to ES6 modules")
    parser.add_argument(
        "--dataset",
        metavar="DATASET",
        required=True,
        help="name of directory that contains JavaScript packages")
    parser.add_argument(
        "--output",
        help="name of directory to write migrated dataset; defaults to 'DATASET-es6'")

    args = parser.parse_args()
    if not Path(args.dataset).exists():
        parser.print_usage()
        print("{}: error: directory {} does not exist".format(parser.prog, args.dataset))
        exit(2)
    if args.output is None:
        dataset_dir = Path(args.dataset).parts[-1]
        output_dir = f"{dataset_dir}-es6"
        args.output = str(Path(args.dataset).with_name(output_dir))

    return args

def migrate_package(dataset_dir, output_dir, package):
    cjs_package = Path(dataset_dir, package)
    es6_package = Path(output_dir, package)

    # If the target package already exists, skip
    if es6_package.exists():
        return ResultStatus.SKIP

    # Copy the package over
    shutil.copytree(cjs_package, es6_package, ignore_dangling_symlinks=True)

    # Run cjs-to-es6
    args = [CJS_TO_ES6_PATH, es6_package]
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8")

    if result.returncode == 0:
        return ResultStatus.OK
    else:
        # Delete the package that failed to migrate
        shutil.rmtree(es6_package, ignore_errors=True)
        return ResultStatus.FAIL

def main():
    args = parse_args()

    dataset_dir = Path(args.dataset).resolve()
    output_dir = Path(args.output).resolve()

    # Create the output directory
    output_dir.mkdir(parents=True, exist_ok=True)

    packages = sorted([p.resolve().relative_to(dataset_dir)
                       for p in dataset_dir.iterdir()])
    num_pkgs = len(packages)

    num_ok = 0
    num_fail = 0
    num_skip = 0

    for i, package in enumerate(packages):
        print("[{}/{}] {} ... ".format(i + 1, num_pkgs, package), end="", flush=True)
        result = migrate_package(dataset_dir, output_dir, package)

        if result is ResultStatus.OK:
            print("[ OK ]", flush=True)
            num_ok += 1
        elif result is ResultStatus.SKIP:
            print("[SKIP]", flush=True)
            num_skip += 1
        elif result is ResultStatus.FAIL:
            print("[FAIL]", flush=True)
            num_fail += 1

    print(f"Number of successes: {num_ok}")
    print(f"Number of fails: {num_fail}")
    print(f"Number of skips: {num_skip}")

if __name__ == "__main__":
    main()
