from pathlib import Path
from subprocess import PIPE
import subprocess

from util import Result, ResultStatus
import util

# TODO: Test this some more, refactor into class, refactor, interface probably not needed

path = Path(util.tools_root, "..", "DeepTyper", "pretrained", "readout.py").resolve()
if not path.exists():
    print("Could not find DeepTyper: {}".format(path))
    exit(1)

def infer(args):
    """Run DeepTyper's type inference on the JavaScript projects within the given directory."""
    directory = Path(args.directory).resolve()
    dataset = Path(args.dataset)
    in_directory = Path(directory, "original", dataset).resolve()

    # Create the out directory, if it doesn't already exist
    out_directory = Path(directory, "DeepTyper-out", dataset, "predictions").resolve()
    out_directory.mkdir(parents=True, exist_ok=True)

    # Get the packages we want as inputs
    packages = sorted([p.resolve()
                       for p in in_directory.iterdir()
                       if len(list(p.rglob("*.js")))])
    num_packages = len(packages)

    # Helper to get a package's name (without its full path)
    def short_name(package):
        return Path(package).relative_to(in_directory)

    print("Inferring types with DeepTyper: {}".format(path))
    print("Input directory: {}".format(in_directory))
    print("Output directory: {}".format(out_directory))
    print("Found {} packages".format(num_packages))

    num_ok = 0
    num_fail = 0
    num_skip = 0

    # Get the packages that should be skipped. A package is skipped if its latest
    # output is newer than its latest input. This assumes inputs will not be modified
    # while outputs are being written, i.e. no race conditions.
    to_skip = set()
    for package in packages:
        input_timestamps = sorted([f.stat().st_mtime
                                   for f in package.rglob("*.js")
                                   if f.is_file], reverse=True)
        input_latest = input_timestamps[0] if input_timestamps else None

        output_dir = Path(out_directory, short_name(package)).resolve()
        output_files = [f.resolve()
                        for f in output_dir.rglob("*")
                        if f.is_file() and (f.suffix == ".csv" or f.suffix == ".err")]
        output_timestamps = sorted([f.stat().st_mtime for f in output_files], reverse=True)
        output_latest = output_timestamps[0] if output_timestamps else None

        # If output timestamps are newer than input timestamps, then skip
        if input_latest and output_latest and input_latest < output_latest:
            num_skip += 1
            to_skip.add(package)
            continue

        # Delete the old output files
        for f in output_files:
            f.unlink()

    for i, package in enumerate(packages):
        print("[{}/{}] {} ... ".format(i + 1, num_packages, short_name(package)), end="", flush=True)

        if package in to_skip:
            print(util.ANSI_YELLOW + "[SKIP]" + util.ANSI_RESET, flush=True)
            continue

        result = infer_on_package(package, in_directory, out_directory)
        print(result.string)
        if result.status is ResultStatus.OK:
            num_ok += 1
        elif result.status is ResultStatus.SKIP:
            num_skip += 1
        elif result.status is ResultStatus.FAIL:
            num_fail += 1

    print("Number of successes: {}".format(num_ok))
    print("Number of fails: {}".format(num_fail))
    print("Number of skips: {}".format(num_skip))

def infer_on_package(package, in_directory, out_directory):
    files = sorted([f.resolve() for f in package.rglob("*.js") if f.is_file()])
    short_files = [f.relative_to(in_directory) for f in files]

    for file, short_file in zip(files, short_files):
        csv_file = Path(out_directory, short_file).resolve().with_suffix(".csv")
        err_file = csv_file.with_suffix(".err")

        # Run DeepTyper if the output files do not exist,
        # or the output file timestamps are older than the input
        args = ["python", path.name, file]
        result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=path.parent)

        # Create target directories for output
        csv_file.parent.mkdir(parents=True, exist_ok=True)

        if result.returncode == 0:
            csv_output = file.with_suffix(".csv")
            if csv_output.exists():
                csv_output.rename(csv_file)
                return Result(package, ResultStatus.OK, "{}[ OK ]{}".format(util.ANSI_GREEN, util.ANSI_RESET))
            else:
                print("Error: expected .csv file to be created on successful run")

            # DeepTyper warnings are unhelpful; every execution generates warnings
        else:
            with open(err_file, mode="w", encoding="utf-8") as f:
                print(result.stderr, file=f)
                return Result(package, ResultStatus.FAIL, "{}[FAIL]{}".format(util.ANSI_RED, util.ANSI_RESET))
