# This script downloads the dependency type definitions for a dataset.
# For each dependency "d" of a package, it installs "@types/d" from NPM

from pathlib import Path
from subprocess import PIPE
from tqdm import tqdm
import argparse, json, re, subprocess

import util

def parse_args():
    parser = argparse.ArgumentParser(description="Installs dependency type definitions for a dataset")
    parser.add_argument(
        "--dataset",
        nargs="+",
        help="list of directories that contains JavaScript packages")
    parser.add_argument(
        "--output",
        required=True,
        help="working directory to save dependencies")

    args = parser.parse_args()
    for d in args.dataset:
        util.check_exists(d)
    util.check_exists(args.output)

    return args

def normalize_name(dep):
    # "@types/p" -> "@types/p"
    # "@abc/def" -> "@types/abc__def"
    # "p" -> "@types/p"
    if dep.startswith("@types/"):
        return dep
    elif dep.startswith("@"):
        return re.sub(r"@(.*)/(.*)", r"@types/\1__\2", dep)
    else:
        return f"@types/{dep}"

def install_dep(dep, target):
    normalized = normalize_name(dep)
    args = ["npm", "install", normalized]
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=target)
    return result


def main():
    args = parse_args()

    dependencies = {dep
                    for dataset in args.dataset
                    for package in Path(dataset).iterdir()
                    for dep in util.get_dependencies(package.resolve())}
    failures = []

    for d in tqdm(sorted(list(dependencies))):
        result = install_dep(d, args.output)
        if result.returncode != 0:
            failures.append(d)

    if len(failures) > 0:
        print("Warning! The following type definitions failed to install! Please investigate!")
        print(" ".join(failures))

if __name__ == "__main__":
    main()
