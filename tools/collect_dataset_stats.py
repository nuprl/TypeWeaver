# This script collects some statistics for a JavaScript dataset. It uses cloc
# to compute lines of code, which ignores comments and blanks.
# For each package, it reports:
#   - number of dependencies
#   - lines of JavaScript code
#   - number of JavaScript files (only .js files)
#   - size of JavaScript files, in bytes (only .js files)
#   - lines of TypeScript code
#   - number of TypeScript files
#   - size of TypeScript files, in bytes
# Results are printed in CSV format

from pathlib import Path
from subprocess import PIPE
import argparse, json, subprocess

def parse_args():
    parser = argparse.ArgumentParser(description="Collects statistics for a JavaScript dataset")
    parser.add_argument(
        "--dataset",
        required=True,
        help="name of directory that contains JavaScript packages")

    args = parser.parse_args()
    if not Path(args.dataset).exists():
        parser.print_usage()
        print("{}: error: directory {} does not exist".format(parser.prog, args.dataset))
        exit(2)

    return args

def get_dependencies(path):
    package_json = Path(path, "package.json")

    if not package_json.exists():
        return []

    with open(package_json) as f:
        data = json.load(f)
        if "dependencies" not in data.keys():
            return []

        return list(data["dependencies"].keys())

def get_loc(path):
    args = ["cloc", "--include-lang=JavaScript,TypeScript", "--json", path]
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8")
    if len(result.stdout) > 0:
        data = json.loads(result.stdout)
        if data is None:
            return 0
        else:
            js = data["JavaScript"]["code"] if "JavaScript" in data else 0
            ts = data["TypeScript"]["code"] if "TypeScript" in data else 0
            return js, ts
    else:
        return 0, 0

def get_files(path, ext):
    files = [f.resolve() for f in path.rglob(f"*.{ext}") if f.is_file()]
    num_files = len(files)
    size = sum([f.stat().st_size for f in files])
    return num_files, size

def main():
    args = parse_args()

    print('"Package","Number of deps","Lines of JS code","Number of JS files","Size of files JS (bytes)","Lines of TS code","Number of TS files","Size of TS (bytes)"')

    dataset_dir = Path(args.dataset).resolve()
    packages = sorted([p.resolve().relative_to(dataset_dir)
                       for p in dataset_dir.iterdir()])

    for package in packages:
        path = Path(dataset_dir, package)
        deps = get_dependencies(path)
        num_deps = len(deps)
        js_loc, ts_loc = get_loc(path)
        js_num_files, js_size = get_files(path, "js")
        ts_num_files, ts_size = get_files(path, "ts")

        print(f"{package},{num_deps},{js_loc},{js_num_files},{js_size},{ts_loc},{ts_num_files},{ts_size}")

if __name__ == "__main__":
    main()
