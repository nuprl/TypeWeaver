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
from tqdm import tqdm
import argparse, shutil, subprocess

class ResultStatus(Enum):
    OK = 0
    FAIL = 1
    SKIP = 2

CJS_TO_ES6_PATH = Path(Path(__file__).parent, "weaver", "cjs-to-es6").resolve()
if not Path(CJS_TO_ES6_PATH).exists():
    print("Could not find cjs-to-es6 script: {}".format(CJS_TO_ES6_PATH))
    exit(1)

def parse_args():
    parser = argparse.ArgumentParser(description="Migrates a JavaScript dataset from CommonJS to ES6 modules")
    parser.add_argument(
        "--directory",
        required=True,
        help="root directory containing input and output directories")
    parser.add_argument(
        "--dataset",
        metavar="DATASET",
        required=True,
        help="name of directory that contains JavaScript packages")

    args = parser.parse_args()
    directory = Path(args.directory, "original", args.dataset)
    if not directory.exists():
        parser.print_usage()
        print("{}: error: directory {} does not exist".format(parser.prog, directory))
        exit(2)

    return args

def migrate_package(directory, dataset_dir, package):
    cjs_package = Path(dataset_dir, package)
    es6_package = Path(dataset_dir, f"{package}-es6")

    # If the target package already exists, skip
    if es6_package.exists():
        return ResultStatus.SKIP

    # Copy the package over
    shutil.copytree(cjs_package, es6_package, ignore_dangling_symlinks=True)

    # Containerized path
    cpath = Path("/data", Path(es6_package).relative_to(directory.parent))
    args = [CJS_TO_ES6_PATH, cpath]
    # Run cjs-to-es6
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=CJS_TO_ES6_PATH.parent)

    if result.returncode == 0:
        return ResultStatus.OK
    else:
        # Delete the package that failed to migrate
        shutil.rmtree(es6_package, ignore_errors=True)
        return ResultStatus.FAIL

def main():
    args = parse_args()

    directory = Path(args.directory).resolve()
    dataset_dir = Path(directory, "original", args.dataset).resolve()

    packages = sorted([p.resolve().relative_to(dataset_dir)
                       for p in dataset_dir.iterdir()])
    num_pkgs = len(packages)

    num_ok = 0
    num_fail = 0
    num_skip = 0

    with tqdm(total=len(packages), desc="CJS to ES6", unit="package", miniters=1) as t:
        for package in packages:
            t.update()
            result = migrate_package(directory, dataset_dir, package)

            # if result is ResultStatus.OK:
            #     print("[ OK ]", flush=True)
            #     num_ok += 1
            # elif result is ResultStatus.SKIP:
            #     print("[SKIP]", flush=True)
            #     num_skip += 1
            # elif result is ResultStatus.FAIL:
            #     print("[FAIL]", flush=True)
            #     num_fail += 1

    # print(f"Number of successes: {num_ok}")
    # print(f"Number of fails: {num_fail}")
    # print(f"Number of skips: {num_skip}")

if __name__ == "__main__":
    main()
