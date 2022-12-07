from concurrent import futures
from pathlib import Path
from subprocess import PIPE
import os, subprocess

import util
from util import Result, ResultStatus

class TypeChecker:
    path = Path(util.tools_root, "..", "weaver", "tsc").resolve()

    def __init__(self, args):
        if not self.path.exists():
            print(f"error: could not find tsc: {self.path}")
            exit(1)

        self.directory = Path(args.directory).resolve()
        self.dataset = Path(args.dataset)
        self.engine = args.engine
        self.workers = args.workers
        self.typecheck_dir = Path(args.typecheck)
        self.emit_declaration = args.emit_declaration
        self.in_directory = Path(self.directory, f"{self.engine}-out", self.dataset, self.typecheck_dir).resolve()
        self.out_directory = self.in_directory.with_name(f"{self.typecheck_dir}-checked")
        self.dts_directory = self.in_directory.with_name(f"{self.typecheck_dir}-typedefs")

        if not self.in_directory.exists():
            print(f"error: directory does not exist: {self.in_directory}")
            exit(2)

        if self.emit_declaration:
            self.dts_directory.mkdir(parents=True, exist_ok=True)

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
                                       for f in package.rglob("*.ts")
                                       if f.is_file], reverse=True)
            input_latest = input_timestamps[0] if input_timestamps else None

            output_dir = Path(self.out_directory).resolve()
            output_files = [Path(output_dir, f"{self.short_name(package)}.{ext}")
                            for ext in ["err", "out"]]
            output_timestamps = sorted([f.stat().st_mtime
                                        for f in output_files
                                        if f.exists()], reverse=True)
            output_latest = output_timestamps[0] if output_timestamps else None

            # If output timestamps are newer than input timestamps, then skip
            return input_latest and output_latest and input_latest < output_latest

        return { p for p in packages if should_skip(p) }

    def typecheck_package(self, package, to_skip):
        """
        Run type checking on a single package, skipping packages that have
        already been processed. This function will call tsc on all TypeScript
        files in the package. Also record the result, writing the ok or error
        file to the filesystem.
        """
        if package in to_skip:
            return Result(package, ResultStatus.SKIP)

        out_file = Path(self.out_directory, f"{self.short_name(package)}.out").resolve()
        err_file = out_file.with_suffix(".err")
        warn_file = out_file.with_suffix(".warn")

        # Delete the old output files
        if out_file.exists():
            out_file.unlink()
        if err_file.exists():
            err_file.unlink()
        if warn_file.exists():
            warn_file.unlink()

        if self.emit_declaration:
            # Running tsc in a container means adjusting the path
            decl_dir = util.containerized_path(Path(self.dts_directory, self.short_name(package)), self.directory)
            emit_opts = ["--removeComments", "--declaration", "--emitDeclarationOnly", "--declarationDir", decl_dir]
        else:
            emit_opts = ["--noEmit"]

        # Running tsc in a container means adjusting the path
        # TODO: pass all files or specify a tsconfig.json?
        ts_files = [util.containerized_path(f, self.directory) for f in package.rglob("*.ts") if f.is_file()]

        # Set the container's working directory by setting an environment variable
        my_env = os.environ.copy()
        my_env["TYPEWEAVER_TSC_WORKDIR"] = str(util.containerized_path(package, self.directory))

        # Set some compiler flags; these appear to be reasonable defaults for the entire dataset
        # But individual projects may need different flags
        #   --esModuleInterop         // better handling of CommonJS and ES6 modules
        #   --moduleResolution node   // make the default option explicit, use Node.js module resolution
        #   --target es6              // enable es6 features; some libraries use features not supported in the default es3 target
        #   --lib es2021,dom          // include default es2021 library definitions and browser DOM definitions
        args = [self.path, "--esModuleInterop", "--moduleResolution", "node", "--target", "es6", "--lib", "es2021,dom", *emit_opts, *ts_files]
        result = subprocess.run(args, env=my_env, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=self.path.parent)

        if result.returncode == 0:
            # tsc prints errors and warnings to stdout
            if result.stdout:
                with open(warn_file, mode="w", encoding="utf-8") as f:
                    print(result.stdout, file=f)
            out_file.touch()
            return Result(package, ResultStatus.OK)
        else:
            # tsc prints errors and warnings to stdout
            with open(err_file, mode="w", encoding="utf-8") as f:
                print(result.stdout, file=f)
                return Result(package, ResultStatus.FAIL)

    def typecheck_dataset(self, packages):
        """
        Run type checking on a dataset. Print a running log, and track how many
        packages succeeded, failed, or were skipped.
        """
        num_ok = 0
        num_fail = 0
        num_skip = 0

        # Compute the packages to skip
        to_skip = self.get_skip_set(packages)

        with futures.ProcessPoolExecutor(max_workers=self.workers) as executor:
            fs = [executor.submit(self.typecheck_package, package, to_skip) for package in packages]

            # While the process pool executes the jobs, wait for each result in order.
            # This prints the log in alphabetic order, rather than in completion order.
            # But we still get the speedup from using multiple workers.
            for i, f in enumerate(fs):
                print("[{}/{}] {} ... ".format(i + 1, len(packages), self.short_name(packages[i])), end="", flush=True)
                result = f.result()
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
        Run type checking.
        """
        # Create the out directory, if it doesn't already exist
        self.out_directory.mkdir(parents=True, exist_ok=True)

        # Get packages that do not contain .err files, since those had errors
        # during type weaving.
        packages = sorted([p.resolve()
                           for p in self.in_directory.iterdir()
                           if len(list(p.rglob("*.err"))) == 0])

        print(f"Type checking with: {self.path}")
        print(f"Input directory: {self.in_directory}")
        print(f"Output directory: {self.out_directory}")
        print(f"Found {len(packages)} packages")

        num_ok, num_fail, num_skip = self.typecheck_dataset(packages)

        print(f"Number of successes: {num_ok}")
        print(f"Number of fails: {num_fail}")
        print(f"Number of skips: {num_skip}")
