from pathlib import Path
from subprocess import PIPE
import subprocess

from util import Result, ResultStatus
import util

# TODO: Test this some more, refactor, maybe make a base class

class DeepTyper:
    path = Path(util.tools_root, "..", "DeepTyper", "pretrained", "readout.py").resolve()

    def __init__(self, args):
        if not self.path.exists():
            print("Could not find DeepTyper: {}".format(self.path))
            exit(1)

        self.directory = Path(args.directory).resolve()
        self.dataset = Path(args.dataset)
        self.in_directory = Path(self.directory, "original", self.dataset).resolve()
        self.out_directory = Path(self.directory, "DeepTyper-out", self.dataset, "predictions").resolve()

    def short_name(self, package):
        """
        Takes the full path to a package and returns its short name, i.e. the
        name of the package without its path.
        """
        return Path(package).parts[-1]

    def get_skip_set(self, packages):
        """
        Get the packages that should be skipped. A package is skipped if its
        latest output is newer than its latest input. This assumes inputs will
        not be modified while outputs are being written, i.e. no race
        conditions.
        """
        to_skip = set()
        for package in packages:
            input_timestamps = sorted([f.stat().st_mtime
                                    for f in package.rglob("*.js")
                                    if f.is_file], reverse=True)
            input_latest = input_timestamps[0] if input_timestamps else None

            output_dir = Path(self.out_directory, self.short_name(package)).resolve()
            output_files = [f.resolve()
                            for f in output_dir.rglob("*")
                            if f.is_file() and (f.suffix == ".csv" or f.suffix == ".err")]
            output_timestamps = sorted([f.stat().st_mtime for f in output_files], reverse=True)
            output_latest = output_timestamps[0] if output_timestamps else None

            # If output timestamps are newer than input timestamps, then skip
            if input_latest and output_latest and input_latest < output_latest:
                to_skip.add(package)
                continue

            # Delete the old output files
            for f in output_files:
                f.unlink()

        return to_skip

    def infer_on_package(self, package, to_skip):
        """
        Run inference on a single package, skipping packages that have already
        been processed. For DeepTyper, this means running inference on each file
        in the package. Also record the result, writing the type predictions or
        errors to the filesystem.
        """
        if package in to_skip:
            return Result(package, ResultStatus.SKIP)

        files = sorted([f.resolve() for f in package.rglob("*.js") if f.is_file()])

        for file in files:
            csv_file = Path(self.out_directory, self.short_name(file)).resolve().with_suffix(".csv")
            err_file = csv_file.with_suffix(".err")

            # Run DeepTyper if the output files do not exist,
            # or the output file timestamps are older than the input
            args = ["python", self.path.name, file]
            result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=self.path.parent)

            # Create target directories for output
            csv_file.parent.mkdir(parents=True, exist_ok=True)

            if result.returncode == 0:
                csv_output = file.with_suffix(".csv")
                if csv_output.exists():
                    csv_output.rename(csv_file)
                    return Result(package, ResultStatus.OK)
                else:
                    print("Error: expected .csv file to be created on successful run")
                # DeepTyper warnings are unhelpful; every execution generates warnings
            else:
                with open(err_file, mode="w", encoding="utf-8") as f:
                    print(result.stderr, file=f)
                    return Result(package, ResultStatus.FAIL)

    def run():
        """
        Run type inference on a dataset, and track how many packages succeeded,
        failed, or were skipped.
        """
        # Create the out directory, if it doesn't already exist
        self.out_directory.mkdir(parents=True, exist_ok=True)

        # Get the packages we want as inputs
        packages = sorted([p.resolve()
                        for p in self.in_directory.iterdir()
                        if len(list(p.rglob("*.js")))])
        num_packages = len(packages)

        print("Inferring types with DeepTyper: {}".format(self.path))
        print("Input directory: {}".format(self.in_directory))
        print("Output directory: {}".format(self.out_directory))
        print("Found {} packages".format(num_packages))

        num_ok = 0
        num_fail = 0
        num_skip = 0

        # Compute the packages to skip
        to_skip = self.get_skip_set(packages)

        for i, package in enumerate(packages):
            print("[{}/{}] {} ... ".format(i + 1, num_packages, self.short_name(package)), end="", flush=True)

            result = self.infer_on_package(package)
            print(result.string, flush=True)
            if result.is_ok():
                num_ok += 1
            elif result.is_skip():
                num_skip += 1
            elif result.is_fail():
                num_fail += 1

        print("Number of successes: {}".format(num_ok))
        print("Number of fails: {}".format(num_fail))
        print("Number of skips: {}".format(num_skip))
