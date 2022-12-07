from pathlib import Path
from subprocess import PIPE
import subprocess

import util
from util import Result, ResultStatus

class DeepTyper:
    path = Path(util.tools_root, "..", "DeepTyper", "pretrained", "readout.py").resolve()

    def __init__(self, args):
        if not self.path.exists():
            print(f"error: could not find DeepTyper: {self.path}")
            exit(1)

        self.directory = Path(args.directory).resolve()
        self.dataset = Path(args.dataset)
        self.in_directory = Path(self.directory, "original", self.dataset).resolve()
        self.out_directory = Path(self.directory, "DeepTyper-out", self.dataset, "predictions").resolve()

    def short_name(self, name):
        """
        Takes the full (input) path to a package or file, and returns its short
        name, i.e. the relative path to that package or file from the input
        directory.
        """
        return Path(name).relative_to(self.in_directory)

    def get_skip_set(self, packages):
        """
        Return the set of packages that should be skipped. A package is skipped
        if its latest output is newer than its latest input. This assumes inputs
        will not be modified while outputs are being written, i.e. no race
        conditions.
        """
        def should_skip(package):
            input_timestamps = sorted([f.stat().st_mtime
                                       for f in package.rglob("*.js")
                                       if f.is_file], reverse=True)
            input_latest = input_timestamps[0] if input_timestamps else None
            input_count = len(input_timestamps)

            output_dir = Path(self.out_directory, self.short_name(package)).resolve()
            output_files = [f.resolve()
                            for f in output_dir.rglob("*")
                            if f.is_file() and (f.suffix == ".csv" or f.suffix == ".err")]
            output_timestamps = sorted([f.stat().st_mtime for f in output_files], reverse=True)
            output_latest = output_timestamps[0] if output_timestamps else None
            output_count = len(output_timestamps)

            # If output timestamps are newer than input timestamps, then skip
            return input_latest and output_latest and input_count == output_count and input_latest < output_latest

        return { p for p in packages if should_skip(p) }

    def infer_on_package(self, package, to_skip):
        """
        Run inference on a single package, skipping packages that have already
        been processed. For DeepTyper, this means running inference on each file
        in the package. Also record the result, writing the type predictions or
        errors to the filesystem.
        """
        if package in to_skip:
            return Result(package, ResultStatus.SKIP)

        all_ok = True
        files = sorted([f.resolve() for f in package.rglob("*.js") if f.is_file()])
        for file in files:
            csv_file = Path(self.out_directory, self.short_name(file)).resolve().with_suffix(".csv")
            err_file = csv_file.with_suffix(".err")

            # Delete csv/err output if they exist
            if csv_file.exists():
                csv_file.unlink()
            if err_file.exists():
                err_file.unlink()

            # Run DeepTyper on the file
            args = ["python", self.path.name, file]
            result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=self.path.parent)

            # Create target directories for output
            csv_file.parent.mkdir(parents=True, exist_ok=True)

            csv_output = file.with_suffix(".csv")
            if result.returncode == 0 and csv_output.exists():
                csv_output.rename(csv_file)
            else:
                all_ok = False
                with open(err_file, mode="w", encoding="utf-8") as f:
                    if result.returncode != 0:
                        print(result.stderr, file=f)
                    else:
                        print(f"error: expected {csv_output} to be created on successful run", file=f)

        if all_ok:
            return Result(package, ResultStatus.OK)
        else:
            return Result(package, ResultStatus.FAIL)

    def infer_on_dataset(self, packages):
        """
        Run type inference on a dataset. Print a running log, and track how many
        packages succeeded, failed, or were skipped.
        """
        num_ok = 0
        num_fail = 0
        num_skip = 0

        # Compute the packages to skip
        to_skip = self.get_skip_set(packages)

        for i, package in enumerate(packages):
            print("[{}/{}] {} ... ".format(i + 1, len(packages), self.short_name(package)), end="", flush=True)
            result = self.infer_on_package(package, to_skip)
            print(result.message(), flush=True)

            if result.is_ok():
                num_ok += 1
            elif result.is_skip():
                num_skip += 1
            elif result.is_fail():
                num_fail += 1

        return num_ok, num_fail, num_skip

    def run(self):
        """
        Run type inference.
        """
        # Create the out directory, if it doesn't already exist
        self.out_directory.mkdir(parents=True, exist_ok=True)

        # Get the packages we want as inputs. Make sure we only get packages
        # that actually contain JS files.
        packages = sorted([p.resolve()
                           for p in self.in_directory.iterdir()
                           if len(list(p.rglob("*.js")))])

        print(f"Inferring types with DeepTyper: {self.path}")
        print(f"Input directory: {self.in_directory}")
        print(f"Output directory: {self.out_directory}")
        print(f"Found {len(packages)} packages")

        num_ok, num_fail, num_skip = self.infer_on_dataset(packages)

        print(f"Number of successes: {num_ok}")
        print(f"Number of fails: {num_fail}")
        print(f"Number of skips: {num_skip}")
