from concurrent import futures
from pathlib import Path
from subprocess import PIPE
import os, shutil, subprocess

import util
from util import Result, ResultStatus, tqdm

class TypeScriptCompiler:

    def __init__(self, args):
        self.containers = not args.no_containers
        if self.containers:
            self.path = Path(util.src_root, "weaver", "tsc").resolve()
        else:
            self.path = Path(util.src_root, "weaver", "src", "node_modules", ".bin", "tsc").resolve()

        if not self.path.exists():
            print(f"error: could not find tsc: {self.path}")
            exit(1)

        self.directory = Path(args.directory).resolve()
        self.dataset = Path(args.dataset)
        self.workers = args.workers
        self.in_directory = Path(self.directory, "original", self.dataset).resolve()
        self.out_directory = Path(self.directory, "tsc-out", self.dataset, args.predict_out).resolve()
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
                            if f.is_file() and (f.suffix == ".ts" or f.suffix == ".err")]
            output_timestamps = sorted([f.stat().st_mtime for f in output_files], reverse=True)
            output_latest = output_timestamps[0] if output_timestamps else None
            output_count = len(output_timestamps)

            # If output timestamps are newer than input timestamps, then skip
            return input_latest and output_latest and input_count == output_count and input_latest < output_latest

        return { p for p in packages if should_skip(p) }

    def predict_on_package(self, package, to_skip):
        """
        Run prediction on a single package, skipping packages that have already
        been processed. Also record the result, writing the type predictions or
        errors to the filesystem.
        """
        if package in to_skip:
            return Result(package, ResultStatus.SKIP)

        # Delete all files from output directory
        package_out = Path(self.out_directory, self.short_name(package))
        files = [f.resolve() for f in package_out.rglob("*") if f.is_file()]
        for f in files:
            f.unlink()

        err_file = Path(package_out, "output.err")
        warn_file = Path(package_out, "output.warn")

        # Copy all source files to output directory
        files = sorted([f.resolve() for f in package.rglob("*.js") if f.is_file()])
        for src in files:
            dst = Path(self.out_directory, self.short_name(src)).resolve()
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy(src, dst)

        # Get a list of JS files to run tsc on
        if self.containers:
            js_files = [util.containerized_path(f, self.directory) for f in package_out.rglob("*.js") if f.is_file()]
        else:
            js_files = [f.relative_to(package_out) for f in package_out.rglob("*.js") if f.is_file()]

        # Set some compiler flags; these appear to be reasonable defaults for the entire dataset
        # But individual projects may need different flags
        #   --declaration             // emit .d.ts declarations
        #   --allowJs                 // allow type checking JavaScript
        #   --emitDeclarationOnly     // don't emit .ts, only .d.ts
        #   --esModuleInterop         // better handling of CommonJS and ES6 modules
        #   --moduleResolution node   // make the default option explicit, use Node.js module resolution
        #   --target es6              // enable es6 features; some libraries use features not supported in the default es3 target
        #   --lib es2021,dom          // include default es2021 library definitions and browser DOM definitions
        args = [self.path, "--declaration", "--allowJs", "--emitDeclarationOnly", "--esModuleInterop", "--moduleResolution", "node", "--target", "es6", "--lib", "es2021,dom", *js_files]

        if self.containers:
            my_env = os.environ.copy()
            my_env["TYPEWEAVER_TSC_WORKDIR"] = str(util.containerized_path(package_out, self.directory))
            result = subprocess.run(args, env=my_env, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=self.path.parent)
        else:
            result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=package_out)

        # Note: don't delete JavaScript files from package_out!
        # Need them for type checking!

        if result.returncode == 0:
            # tsc prints errors and warnings to stdout
            if result.stdout:
                with open(warn_file, mode="w", encoding="utf-8") as f:
                    print(result.stdout, file=f)
            return Result(package, ResultStatus.OK)
        else:
            # tsc prints errors and warnings to stdout
            with open(err_file, mode="w", encoding="utf-8") as f:
                print(result.stdout, file=f)
                return Result(package, ResultStatus.FAIL)

    def predict_on_dataset(self, packages):
        """
        Run type prediction on a dataset. Track how many packages succeeded,
        failed, or were skipped.
        """
        num_ok, num_fail, num_skip = 0, 0, 0

        # Compute the packages to skip
        to_skip = self.get_skip_set(packages)

        with futures.ProcessPoolExecutor(max_workers=self.workers) as executor:
            fs = [executor.submit(self.predict_on_package, package, to_skip) for package in packages]

            # While the process pool executes the jobs, wait for each result in order.
            # This prints the log in alphabetic order, rather than in completion order.
            # But we still get the speedup from using multiple workers.
            with tqdm(total=len(fs), desc=f"tsc {self.dataset}", unit="package", miniters=1) as t:
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
            print(f"Predicting types with tsc: {self.path}")
            print(f"Input directory: {self.in_directory}")
            print(f"Output directory: {self.out_directory}")
            print(f"Found {len(packages)} packages")
        else:
            num_ok, num_fail, num_skip = self.predict_on_dataset(packages)
            print(f"    Out of {len(packages)} packages: {num_ok} succeeded, {num_fail} failed, {num_skip} skipped")
