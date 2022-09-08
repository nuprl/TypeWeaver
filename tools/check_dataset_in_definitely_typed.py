# This script checks a JavaScript dataset against the DefinitelyTyped repository.
# For each package, it reports:
#   - if the package contains executable code (*.js) files
#   - if the package has typings in DefinitelyTyped
#   - the number of package dependencies
#   - the number of package dependencies that have typings in DefinitelyTyped
#   - the percentage of package dependencies that have typings in DefinitelyTyped
# Results are printed in CSV format

from pathlib import Path
import argparse, bisect, json, re

def parse_args():
    parser = argparse.ArgumentParser(description="Checks if packages and their dependencies are DefinitelyTyped")
    parser.add_argument(
        "--typings",
        required=True,
        help="DefinitelyTyped directory")
    parser.add_argument(
        "--dataset",
        required=True,
        help="name of directory that contains JavaScript packages")

    args = parser.parse_args()
    if not Path(args.typings).exists():
        parser.print_usage()
        print("{}: error: directory {} does not exist".format(parser.prog, args.typings))
        exit(2)

    if not Path(args.dataset).exists():
        parser.print_usage()
        print("{}: error: directory {} does not exist".format(parser.prog, args.dataset))
        exit(2)

    return args

def normalize_name(path):
    # A scoped package "@foo/bar" is named as "foo__bar" in DefinitelyTyped
    return re.sub(r"@(.*)_(.*)", r"\1__\2", str(path))

def has_code(path):
    return len([f for f in path.rglob("*.js") if f.is_file()]) > 0

def is_typed(package, typings):
    package = normalize_name(package)
    idx = bisect.bisect_left(typings, package)
    return idx != len(typings) and typings[idx] == package

def get_dependencies(path):
    package_json = Path(path, "package.json")

    if not package_json.exists():
        return []

    with open(package_json) as f:
        data = json.load(f)
        if "dependencies" not in data.keys():
            return []

        return list(data["dependencies"].keys())

def main():
    args = parse_args()

    print('"Package","Contains code","Is typed","Number of deps","Number of typed deps","Percentage of typed deps"')

    typings_dir = Path(args.typings, "types")
    typings = sorted([str(t.relative_to(typings_dir)) for t in typings_dir.iterdir()])

    dataset_dir = Path(args.dataset)
    packages = sorted([p.resolve().relative_to(dataset_dir)
                       for p in dataset_dir.iterdir()])

    for package in packages:
        path = Path(dataset_dir, package)
        deps = get_dependencies(path)
        typed_deps = [d for d in deps if is_typed(d, typings)]
        num_deps = len(deps)
        num_typed = len(typed_deps)

        print(f"{package},{has_code(path)},{is_typed(package,typings)},{num_deps},{num_typed}", end=",")
        if num_deps == 0:
            print("NA")
        else:
            percentage = num_typed / num_deps
            print(f"{percentage:.2f}")

if __name__ == "__main__":
    main()
