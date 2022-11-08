from pathlib import Path
from subprocess import PIPE
import subprocess, time

import util
from util import Result, ResultStatus

class InCoder:
    path = Path(util.tools_root, "..", "InCoder", "py", "main.py").resolve()

    SLEEP_TIME = 5

    def __init__(self, args):
        if not self.path.exists():
            print(f"error: could not find InCoder: {self.path}")
            exit(1)

        self.directory = Path(args.directory).resolve()
        self.dataset = Path(args.dataset)
        self.in_directory = Path(self.directory, "original", self.dataset).resolve()
        self.out_directory = Path(self.directory, "InCoder-out", self.dataset, args.infer_out).resolve()

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
                            if f.is_file() and (f.suffix == ".ts" or f.suffix == ".err")]
            output_timestamps = sorted([f.stat().st_mtime for f in output_files], reverse=True)
            output_latest = output_timestamps[0] if output_timestamps else None
            output_count = len(output_timestamps)

            # If output timestamps are newer than input timestamps, then skip
            return input_latest and output_latest and input_count == output_count and input_latest < output_latest

        return { p for p in packages if should_skip(p) }

    def infer_on_package(self, package, to_skip):
        """
        Run inference on a single package, skipping packages that have already
        been processed. Also record the result, writing the type predictions or
        errors to the filesystem.
        """
        if package in to_skip:
            return Result(package, ResultStatus.SKIP)

        input_files = [f.resolve() for f in package.rglob("*.js") if f.is_file()]
        output_dir = Path(self.out_directory, self.short_name(package)).resolve()

        # Delete the old output files
        # Don't glob all *.ts, might get *.d.ts by accident
        ts_output_files = [f.with_suffix(".ts") for f in input_files if f.with_suffix(".ts").exists()]
        err_output_files = [f.with_suffix(".err") for f in input_files if f.with_suffix(".err").exists()]
        output_files = ts_output_files + err_output_files
        for f in output_files:
            f.unlink()

        # Poll until the done file is created
        done_file = Path(package, "incoder.done")
        while True:
            if done_file.exists():
                break
            time.sleep(self.SLEEP_TIME)

        # Get the output files, .ts and .err (but they are in the input directory)
        # Don't glob all *.ts, might get *.d.ts by accident
        ts_files = [f.with_suffix(".ts") for f in input_files if f.with_suffix(".ts").exists()]
        err_files = [f.with_suffix(".err") for f in input_files if f.with_suffix(".err").exists()]

        # Move files to their output directory
        for file in (ts_files + err_files):
            output_file = Path(self.out_directory, self.short_name(file))
            output_file.parent.mkdir(parents=True, exist_ok=True)
            file.rename(output_file)

        done_file.unlink()

        if not err_files:
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

        # Create a list of the packages to run
        packages_to_run = set(packages).difference(to_skip)
        packages_list = sorted([str(p) for p in packages_to_run])

        # Only start InCoder if there are packages to run
        p = None
        if packages_list:
            args = ["python", self.path.name, "--write-done-file", "--directories", *packages_list]
            p = subprocess.Popen(args, stdin=PIPE, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=self.path.parent)

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

        if p:
            # If we reach this point, either InCoder has finished processing everything,
            # or there was nothing left to process, so we can kill it
            p.terminate()

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

        print(f"Inferring types with InCoder: {self.path}")
        print(f"Input directory: {self.in_directory}")
        print(f"Output directory: {self.out_directory}")
        print(f"Found {len(packages)} packages")

        num_ok, num_fail, num_skip = self.infer_on_dataset(packages)

        print(f"Number of successes: {num_ok}")
        print(f"Number of fails: {num_fail}")
        print(f"Number of skips: {num_skip}")
