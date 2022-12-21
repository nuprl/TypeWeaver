from pathlib import Path
from subprocess import PIPE
from tqdm import tqdm
import subprocess, threading, time

import util
from util import Result, ResultStatus

class LambdaNet:
    SLEEP_TIME = 5

    def __init__(self, args):
        self.containers = not args.no_containers
        if self.containers:
            self.path = Path(util.src_root, "..", "LambdaNet", "run.sh").resolve()
        else:
            self.path = Path(util.src_root, "..", "LambdaNet", "src").resolve()

        if not self.path.exists():
            print(f"error: could not find LambdaNet: {self.path}")
            exit(1)

        self.directory = Path(args.directory).resolve()
        self.dataset = Path(args.dataset)
        self.in_directory = Path(self.directory, "original", self.dataset).resolve()
        self.out_directory = Path(self.directory, "LambdaNet-out", self.dataset, "predictions").resolve()
        self.dry_run = args.dry_run

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

            # If there is an error, LambdaNet outputs a single output.err file
            # Treat the project as complete, even if the input count doesn't match the output count
            output_err = Path(output_dir, "output.err").resolve()
            all_outputs = output_err.exists() or input_count == output_count

            # If output timestamps are newer than input timestamps, then skip
            return input_latest and output_latest and all_outputs and input_latest < output_latest

        return { p for p in packages if should_skip(p) }

    def predict_on_package(self, package, to_skip):
        """
        Run prediction on a single package, skipping packages that have already
        been processed. Also record the result, writing the type predictions or
        errors to the filesystem.
        """
        if package in to_skip:
            return Result(package, ResultStatus.SKIP)

        input_files = [f.resolve() for f in package.rglob("*.js") if f.is_file()]
        output_dir = Path(self.out_directory, self.short_name(package)).resolve()

        # Delete the old output files
        # Note: there is no race condition where we finish prediction before reaching this point,
        # because we're deleting files from the output directory, not the input directory
        output_files = [f.resolve()
                        for f in output_dir.rglob("*")
                        if f.is_file() and (f.suffix == ".csv" or f.suffix == ".err")]
        for f in output_files:
            f.unlink()

        # Poll until either the done or error files are created
        done_file = Path(package, "done.ok")
        err_file = Path(package, "output.err")
        while True:
            if done_file.exists() or err_file.exists():
                break
            time.sleep(self.SLEEP_TIME)

        if done_file.exists():
            # Success, so (some) CSV files were written
            csv_files = [f.with_suffix(".csv") for f in input_files]
            for file in csv_files:
                output_file = Path(self.out_directory, self.short_name(file))
                output_file.parent.mkdir(parents=True, exist_ok=True)
                if file.exists():
                    # Move CSV files to output directory, creating target directories if necessary
                    file.rename(output_file)
                else:
                    # No CSV file created, because the JS file had no types, so create a placeholder
                    output_file.touch(exist_ok=True)
            done_file.unlink()
            return Result(package, ResultStatus.OK)
        else:
            # Move the error file to the output directory
            output_file = Path(output_dir, "output.err")
            output_file.parent.mkdir(parents=True, exist_ok=True)
            err_file.rename(output_file)
            return Result(package, ResultStatus.FAIL)

    def predict_on_dataset(self, packages):
        """
        Run type prediction on a dataset. Track how many packages succeeded,
        failed, or were skipped.
        """
        num_ok, num_fail, num_skip = 0, 0, 0

        # Compute the packages to skip
        to_skip = self.get_skip_set(packages)

        # Create a string with the packages to run, one per line
        # Running LambdaNet in a container means adjusting the path
        packages_to_run = set(packages).difference(to_skip)
        if self.containers:
            packages_list = sorted([str(util.containerized_path(p, self.directory)) for p in packages_to_run])
        else:
            packages_list = sorted([str(p) for p in packages_to_run])
        packages_string = "\n".join(packages_list)

        # Only start LambdaNet if there are packages to run
        # TODO: is threading required or can we just set stdin to packages_string?
        p = None
        if packages_list:
            if self.containers:
                args = [self.path, "--writeDoneFile"]
                p = subprocess.Popen(args, stdin=PIPE, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=self.path.parent)
            else:
                args = ["sbt", "runMain lambdanet.TypeInferenceService --writeDoneFile"]
                p = subprocess.Popen(args, stdin=PIPE, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=self.path)
            threading.Thread(target=util.send_data_to, args=[p, packages_string]).start()

        time.sleep(self.SLEEP_TIME)
        if p and p.poll():
            print("Error! LambdaNet process failed!")
            exit(2)

        with tqdm(total=len(packages), desc=f"LambdaNet {self.dataset}", unit="package", miniters=1) as t:
            for package in packages:
                t.update()
                result = self.predict_on_package(package, to_skip)

                if result.is_ok():
                    num_ok += 1
                elif result.is_skip():
                    num_skip += 1
                elif result.is_fail():
                    num_fail += 1

        if p:
            # If we reach this point, either LambdaNet has finished processing everything,
            # or there was nothing left to process, so we can kill it
            p.terminate()

        return num_ok, num_fail, num_skip

    def run(self):
        """
        Run type prediction.
        """
        # Create the out directory, if it doesn't already exist
        self.out_directory.mkdir(parents=True, exist_ok=True)

        # Get the packages we want as inputs. Make sure we only get packages
        # that actually contain JS files.
        packages = sorted([p.resolve()
                           for p in self.in_directory.iterdir()
                           if len(list(p.rglob("*.js")))])

        if self.dry_run:
            print(f"Predicting types with LambdaNet: {self.path}")
            print(f"Input directory: {self.in_directory}")
            print(f"Output directory: {self.out_directory}")
            print(f"Found {len(packages)} packages")
        else:
            num_ok, num_fail, num_skip = self.predict_on_dataset(packages)
            print(f"    Out of {len(packages)} packages: {num_ok} succeeded, {num_fail} failed, {num_skip} skipped")
