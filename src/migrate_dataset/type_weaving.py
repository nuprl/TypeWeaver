from concurrent import futures
from pathlib import Path
from subprocess import PIPE
from tqdm import tqdm
import shutil, subprocess

import util
from util import Result, ResultStatus

class TypeWeaver:
    def __init__(self, args):
        self.containers = not args.no_containers
        if self.containers:
            self.path = Path(util.src_root, "weaver", "run.sh").resolve()
        else:
            self.path = Path(util.src_root, "weaver", "src", "index.js").resolve()

        if not self.path.exists():
            print(f"error: could not find type_weaver: {self.path}")
            exit(1)

        self.directory = Path(args.directory).resolve()
        self.dataset = Path(args.dataset)
        self.model = args.model
        self.workers = args.workers
        self.js_directory = Path(self.directory, "original", self.dataset).resolve()
        self.csv_directory = Path(self.directory, f"{self.model}-out", self.dataset, "predictions").resolve()
        self.out_directory = Path(self.directory, f"{self.model}-out", self.dataset, args.weave).resolve()
        self.dry_run = args.dry_run

        if not self.csv_directory.exists():
            print(f"error: type predictions directory does not exist: {self.csv_directory}")
            exit(2)

    def short_name(self, name):
        """
        Takes the full (input) path to a package or file, and returns its short
        name, i.e. the relative path to that package or file from the input
        directory.
        """
        return Path(name).relative_to(self.js_directory)

    def get_skip_set(self, packages):
        """
        Return the set of packages that should be skipped. A package is skipped
        if its latest output is newer than its latest input. This assumes inputs
        will not be modified while outputs are being written, i.e. no race
        conditions.
        """
        def should_skip(package):
            predictions_dir = Path(self.csv_directory, self.short_name(package))
            input_timestamps = sorted([f.stat().st_mtime
                                       for f in predictions_dir.rglob("*.csv")
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

    def weave_package(self, package, to_skip):
        """
        Run type weaving on a single package, skipping packages that have
        already been processed. This function will call type_weaver on all
        JavaScript files in the package. Also record the result, writing the
        TypeScript file or errors/warnings to the filesystem.
        """
        if package in to_skip:
            return Result(package, ResultStatus.SKIP)

        all_ok = True
        js_files = sorted([f.resolve() for f in package.rglob("*.js") if f.is_file()])

        # Copy all source JS/CSV files to output directory
        for js in js_files:
            dst = Path(self.out_directory, self.short_name(js)).resolve()
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy(js, dst)

            csv = Path(self.csv_directory, self.short_name(js)).with_suffix(".csv")
            dst = dst.with_suffix(".csv")
            shutil.copy(csv, dst)

        # Iterate over the JS/CSV files in the output directory
        package_out = Path(self.out_directory, self.short_name(package))
        js_files = sorted([f.resolve() for f in package_out.rglob("*.js") if f.is_file()])
        for js_file in js_files:
            csv_file = js_file.with_suffix(".csv")
            ts_file = js_file.with_suffix(".ts")
            err_file = js_file.with_suffix(".err")
            warn_file = js_file.with_suffix(".warn")

            # Delete old outputs if they exist
            if ts_file.exists():
                ts_file.unlink()
            if err_file.exists():
                err_file.unlink()
            if warn_file.exists():
                warn_file.unlink()

            # Run type_weaver on the file
            if self.containers:
                args = [self.path, "--format", self.model, "--types",
                        util.containerized_path(csv_file, self.directory),
                        util.containerized_path(js_file, self.directory)]
            else:
                args = ["node", self.path.name, "--format", self.model, "--types", csv_file, js_file]

            result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=self.path.parent)

            if result.returncode == 0 and ts_file.exists():
                if result.stderr:
                    with open(warn_file, mode="w", encoding="utf-8") as f:
                        print(result.stderr, file=f)
            else:
                all_ok = False
                with open(err_file, mode="w", encoding="utf-8") as f:
                    if result.returncode != 0:
                        print(result.stderr, file=f)
                    else:
                        print(f"error: expected {ts_file} to be created on successful run", file=f)

            # Delete the JS/CSV input files
            js_file.unlink()
            csv_file.unlink()

        if all_ok:
            return Result(package, ResultStatus.OK)
        else:
            return Result(package, ResultStatus.FAIL)

    def weave_dataset(self, packages):
        """
        Run type weaving on a dataset. Track how many packages succeeded,
        failed, or were skipped.
        """
        num_ok, num_fail, num_skip = 0, 0, 0

        # Compute the packages to skip
        to_skip = self.get_skip_set(packages)

        with futures.ProcessPoolExecutor(max_workers=self.workers) as executor:
            fs = [executor.submit(self.weave_package, package, to_skip) for package in packages]

            # While the process pool executes the jobs, wait for each result in order.
            # This prints the log in alphabetic order, rather than in completion order.
            # But we still get the speedup from using multiple workers.
            with tqdm(total=len(fs), desc=f"Weaving {self.model} {self.dataset}", unit="package", miniters=1) as t:
                for f in fs:
                    t.update()
                    result = f.result()

                    if result.is_ok():
                        num_ok += 1
                    elif result.is_skip():
                        num_skip += 1
                    elif result.is_fail():
                        num_fail += 1

        return num_ok, num_fail, num_skip

    def run(self):
        """
        Run type weaving.
        """
        # Create the out directory, if it doesn't already exist
        self.out_directory.mkdir(parents=True, exist_ok=True)

        # Get the packages we want as inputs, but look at the directories with
        # CSV files, and skip directories that contain .err files, since those
        # had errors during prediction. We only want to do type weaving for
        # packages if prediction succeeded on all the JavaScript files.
        predictions = sorted([p.resolve()
                              for p in self.csv_directory.iterdir()
                              if len(list(p.rglob("*.err"))) == 0])
        packages = [Path(self.js_directory, p.parts[-1]) for p in predictions]

        # Make sure that every JS file has a corresponding CSV file.
        # The helper function gets all files in directory that match *.ext,
        # but strips the extensions so we can compare them.
        def files_with_ext(directory, ext):
            return sorted([f.relative_to(directory).with_suffix("")
                           for f in directory.rglob(f"*.{ext}")])
        packages = [package
                    for package, prediction in zip(packages, predictions)
                    if files_with_ext(package, "js") == files_with_ext(prediction, "csv")]

        if self.dry_run:
            print(f"Type weaving with: {self.path}")
            print(f"Input directory (JS): {self.js_directory}")
            print(f"Input directory (CSV): {self.csv_directory}")
            print(f"Output directory: {self.out_directory}")
            print(f"Found {len(packages)} packages")
        else:
            num_ok, num_fail, num_skip = self.weave_dataset(packages)
            print(f"    Out of {len(packages)} packages: {num_ok} succeeded, {num_fail} failed, {num_skip} skipped")
