# This script iterates over a JavaScript dataset.
# For each package, it copies the .d.ts type definitions from DefinitelyTyped
# to a target directory; if no type definitions exist, it checks the package
# to see if type definitions were bundled.

from pathlib import Path
import argparse, re, shutil
import util

def parse_args():
    parser = argparse.ArgumentParser(description="Copies type definitions to a target directory")
    parser.add_argument(
        "--typings",
        required=True,
        help="DefinitelyTyped directory")
    parser.add_argument(
        "--target",
        required=True,
        help="name of directory to save type definitions")
    parser.add_argument(
        "--datasets",
        nargs="+",
        help="names of directories that contain JavaScript packages")

    args = parser.parse_args()
    util.check_exists(args.typings)
    util.check_exists(args.target)
    for d in args.datasets:
        util.check_exists(d)

    return args

def normalize_name(path):
    # A scoped package "@foo/bar" is named as "foo__bar" in DefinitelyTyped
    return re.sub(r"@(.*)_(.*)", r"\1__\2", str(path))

def copy_type_defs(package, target_dir):
    package_name = package.parts[-1]

    files = [f for f in package.rglob("*.d.ts")]
    for f in files:
        relative_f = f.relative_to(package)
        target = Path(target_dir, package_name, relative_f)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(f, target)

def main():
    args = parse_args()

    typings_dir = Path(args.typings, "types").resolve()
    target_dir = Path(args.target).resolve()
    dataset_dirs = [Path(d).resolve() for d in args.datasets]
    packages = sorted([p.resolve()
                       for d in dataset_dirs
                       for p in d.iterdir()])

    for package in packages:
        package_name = package.parts[-1]
        dts_path = Path(typings_dir, normalize_name(package_name))
        if dts_path.exists():
            print(f"Copying '{package_name}' type definitions from DefinitelyTyped...")
            copy_type_defs(dts_path, target_dir)
        else:
            print(f"Copying '{package_name}' type definitions from original...")
            copy_type_defs(package, target_dir)

if __name__ == "__main__":
    main()
