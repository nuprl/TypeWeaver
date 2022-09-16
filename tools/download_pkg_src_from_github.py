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
    subprocess.run(args, encoding="utf-8", cwd=cwd)

    # Delete the git directory, to save space
    git_dir = Path(cwd, pkg, ".git")
    shutil.rmtree(git_dir, ignore_errors=True)

    return pkg, repo

def main():
    args = parse_args()

    dataset_dir = Path(args.dataset).resolve()
    packages = sorted([p.resolve().relative_to(dataset_dir)
                       for p in dataset_dir.iterdir()])
    num_pkgs = len(packages)

    output_dir = Path(args.output).resolve()

    counter = 0
    repos = {}
    for package in packages:
        counter += 1
        print("[{}/{}] {} ... ".format(counter, num_pkgs, package), flush=True)
        _, repo = download_package(package, output_dir)
        if repo in repos.keys():
            print("Duplicate: " + repo)
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
