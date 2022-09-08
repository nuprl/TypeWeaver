# This script takes a JavaScript dataset, and downloads source code
# from GitHub. To save space, it does a shallow clone.

from pathlib import Path
from subprocess import PIPE
import argparse, re, shutil, subprocess

def parse_args():
    parser = argparse.ArgumentParser(description="Downloads NPM package source code from GitHub")
    parser.add_argument(
        "--dataset",
        required=True,
        help="name of directory that contains JavaScript packages")
    parser.add_argument(
        "--output",
        required=True,
        help="name of directory to save source code")

    args = parser.parse_args()
    if not Path(args.dataset).exists():
        parser.print_usage()
        print("{}: error: directory {} does not exist".format(parser.prog, args.dataset))
        exit(2)

    if not Path(args.output).exists():
        parser.print_usage()
        print("{}: error: directory {} does not exist".format(parser.prog, args.output))
        exit(2)

    return args

def normalize_name(path):
    # A scoped package saved as "@foo_bar" is named "@foo/bar" on NPM
    return re.sub(r"@(.*)_(.*)", r"@\1/\2", str(path))

def download_for_package(pkg, cwd):
    # Get repository URL
    args = ["npm", "view", normalize_name(pkg), "repository.url"]
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8")
    url = re.sub(r"(.*)//(.*)", r"https://\2", result.stdout.rstrip())

    # Clone the repo
    args = ["git", "clone", "--depth", "1", url, pkg]
    subprocess.run(args, encoding="utf-8", cwd=cwd)

    # Delete the git directory, to save space
    git_dir = Path(cwd, pkg, ".git")
    shutil.rmtree(git_dir, ignore_errors=True)

    return pkg

def main():
    args = parse_args()

    dataset_dir = Path(args.dataset).resolve()
    packages = sorted([p.resolve().relative_to(dataset_dir)
                       for p in dataset_dir.iterdir()])
    num_pkgs = len(packages)

    output_dir = Path(args.output).resolve()

    counter = 0
    for package in packages:
        counter += 1
        print("[{}/{}] {} ... ".format(counter, num_pkgs, package), flush=True)
        download_for_package(package, output_dir)

if __name__ == "__main__":
    main()
