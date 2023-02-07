# This script takes a JavaScript dataset, and downloads source code
# from GitHub. To save space, it does a shallow clone.

from pathlib import Path
from subprocess import PIPE
from tqdm import tqdm
import argparse, re, shutil, subprocess

import util

def parse_args():
    parser = argparse.ArgumentParser(description="Downloads NPM package source code from GitHub")
    parser.add_argument(
        "--dataset",
        help="name of directory that contains JavaScript packages")
    parser.add_argument(
        "--input",
        help="file containing names of packages to download")
    parser.add_argument(
        "--output",
        required=True,
        help="name of directory to save source code")

    args = parser.parse_args()
    if args.dataset:
        util.check_exists(args.dataset)
    if args.input and not Path(args.input).exists():
        print(f"error: file does not exist: {args.input}")
        exit(2)
    util.check_exists(args.output)

    if args.dataset and args.input:
        print("error: only one of --dataset or --input can be selected")
        exit(2)
    if not args.dataset and not args.input:
        print("error: at least one of --dataset or --input can be selected")
        exit(2)

    return args

def normalize_name(path):
    # A scoped package saved as "@foo_bar" is named "@foo/bar" on NPM
    return re.sub(r"@(.*)_(.*)", r"@\1/\2", str(path))

def strip_git_suffix(string):
    if string.endswith(".git"):
        return string[:-4]
    else:
        return string

def get_repo(string):
    split_colon = re.split(":", string)
    split_slash = re.split("/", string)
    if len(split_slash) == 2:
        # split as ["git@github.com:abc", "def.git"]
        return strip_git_suffix(split_colon[1])
    else:
        return split_slash[-2] + "/" + strip_git_suffix(split_slash[-1])

def download_package(pkg, cwd):
    # Get repository URL
    args = ["npm", "view", normalize_name(pkg), "repository.url"]
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8")
    output = result.stdout.rstrip()
    url = re.sub(r"(.*)//(.*)", r"https://\2", output)
    repo = get_repo(output)

    # Clone the repo
    args = ["git", "clone", "--depth", "1", url, pkg]
    subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=cwd)

    # Delete the git directory, to save space
    git_dir = Path(cwd, pkg, ".git")
    shutil.rmtree(git_dir, ignore_errors=True)

    # Delete .gitignore files and symlinks
    for f in Path(cwd, pkg).rglob("*"):
        if f.name == ".gitignore" or f.is_symlink():
            f.unlink()

    return pkg, repo

def main():
    args = parse_args()

    if args.dataset:
        dataset_dir = Path(args.dataset).resolve()
        packages = sorted([p.resolve().relative_to(dataset_dir)
                        for p in dataset_dir.iterdir()])
    elif args.input:
        with open(args.input, "r") as file:
            packages = file.readlines()
        packages = [p.strip() for p in packages]

    output_dir = Path(args.output).resolve()

    repos = {}
    with tqdm(total=len(packages), unit="pkg", desc="Packages") as t:
        for package in packages:
            _, repo = download_package(package, output_dir)
            t.set_postfix_str(package)
            t.update()
            if repo in repos.keys():
                repos[repo] += 1
            else:
                repos[repo] = 1

    duplicates = [k for k, v in repos.items() if v > 1]
    if duplicates:
        print("Duplicate repos downloaded!")
        for d in duplicates:
            print(d)

if __name__ == "__main__":
    main()
