from concurrent import futures
from datetime import datetime
from enum import Enum
from pathlib import Path
from subprocess import PIPE
import argparse, os, subprocess

import type_inference, type_weaving
import util

ANSI_RED = "\033[0;31m"
ANSI_GREEN = "\033[0;32m"
ANSI_YELLOW = "\033[0;33m"
ANSI_RESET = "\033[0m"

class ResultStatus(Enum):
    OK = 0
    FAIL = 1
    SKIP = 2

class Result:
    def __init__(self, name, status, string):
        self.name = name
        self.status = status
        self.string = string

def parse_args():
    cpu_count = os.cpu_count();

    parser = argparse.ArgumentParser(description="JavaScript type inference runner script.")
    parser.add_argument(
        "--engine",
        required=True,
        choices=["DeepTyper", "LambdaNet"],
        help="engine to use for type inference, also determines the CSV format for type weaving and directory for type checking")
    parser.add_argument(
        "--directory",
        required=True,
        help="root directory containing input and output directories")
    parser.add_argument(
        "--dataset",
        required=True,
        help="name of directory (within DIRECTORY) that contains JavaScript packages")
    parser.add_argument(
        "--workers",
        type=int,
        default=cpu_count,
        help=f"maximum number of workers to use, defaults to {cpu_count}, the number of processors on the machine")

    group = parser.add_argument_group(
        title="pipeline step",
        description="One of the pipeline steps to run. At least one step is required.")
    group.add_argument(
        "--infer",
        help="run type inference",
        action="store_true")
    group.add_argument(
        "--weave",
        metavar="WEAVEOUT",
        help="run type weaving: take JavaScript and CSV (containing type predictions) to produce TypeScript, and output to directory WEAVEOUT (within DIRECTORY)")
    group.add_argument(
        "--typecheck",
        metavar="STAGE",
        help="run type checking on directory STAGE (within DIRECTORY)")

    args = parser.parse_args()
    if (args.infer or args.weave) and not args.engine:
        parser.print_usage()
        print("error: engine is required for type inference and type weaving")
        exit(2)

    if not (args.infer or args.weave or args.typecheck):
        parser.print_usage()
        print("error: at least one pipeline step argument is required")
        exit(2)

    if not Path(args.directory).exists():
        parser.print_usage()
        print(f"error: directory does not exist: {args.directory}")
        exit(2)

    dataset_source = Path(args.directory, "original", args.dataset).resolve()
    if not dataset_source.exists():
        parser.print_usage()
        print(f"error: dataset directory does not exist: {dataset_source}")
        exit(2)

    return args

def typecheck_job(tsc_path, subdir, short_subdir, in_directory, out_directory):
    out_file = Path(str(Path(out_directory, short_subdir)) + ".out").resolve()
    err_file = out_file.with_suffix(".err")
    warn_file = out_file.with_suffix(".warn")

    # Find all the .ts files in the subdir
    ts_files = [f for f in subdir.rglob("*.ts") if f.is_file()]

    # If either file exists and the timestamps are newer than the inputs, then skip
    if out_file.exists() or err_file.exists():
        input_mtimes = [f.stat().st_mtime for f in ts_files]
        output_mtime = out_file.stat().st_mtime if out_file.exists() else err_file.stat().st_mtime
        if all(mtime < output_mtime for mtime in input_mtimes):
            return Result(short_subdir, ResultStatus.SKIP, "{}[SKIP]{}".format(ANSI_YELLOW, ANSI_RESET))

    # Delete the old files
    if out_file.exists():
        out_file.unlink()
    if err_file.exists():
        err_file.unlink()
    if warn_file.exists():
        warn_file.unlink()

    # Run tsc if the output files do not exist,
    # or the output file timestamps are older than the input
    typeroots = Path(Path(tsc_path).parent, "..", "..", "@types").resolve()
    args = [tsc_path, "--noEmit", "--typeRoots", typeroots, *ts_files]
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=in_directory)

    if result.returncode == 0:
        # tsc prints errors to stdout
        if result.stdout:
            with open(warn_file, mode="w", encoding="utf-8") as f:
                print(result.stdout, file=f)
        out_file.touch()
        return Result(short_subdir, ResultStatus.OK, "{}[ OK ]{}".format(ANSI_GREEN, ANSI_RESET))
    else:
        # tsc prints errors to stdout
        with open(err_file, mode="w", encoding="utf-8") as f:
            print(result.stdout, file=f)
            return Result(short_subdir, ResultStatus.FAIL, "{}[FAIL]{}".format(ANSI_RED, ANSI_RESET))

def typecheck(args):
    """Run type checking"""

    directory = Path(args.directory).resolve()
    dataset = Path(args.dataset)
    typecheck_dir = Path(args.typecheck)
    engine_dir = f"{args.engine}-out"

    tsc_path = Path(Path(__file__).parent, "..", "node_modules", ".bin", "tsc").resolve()
    if not tsc_path.exists():
        print("Could not find tsc: {}".format(tsc_path))
        exit(1)
    print("Type checking with: {}".format(tsc_path))

    # Set up the input directories
    in_directory = Path(directory, engine_dir, dataset, typecheck_dir).resolve()
    if not in_directory.exists():
        print("error: directory {} does not exist".format(in_directory))
        exit(1)
    print("Input directory: {}".format(in_directory))

    # Create the out directory, if it doesn't already exist
    out_directory = in_directory.with_name("{}-checked".format(typecheck_dir))
    out_directory.mkdir(parents=True, exist_ok=True)
    print("Output directory: {}".format(out_directory))

    subdirs = sorted([sd.resolve() for sd in in_directory.iterdir()])
    short_subdirs = [sd.relative_to(in_directory) for sd in subdirs]

    num_subdirs = len(subdirs)
    print("Found {} packages".format(num_subdirs))

    counter = 0
    num_ok = 0
    num_fail = 0
    num_skip = 0

    with futures.ProcessPoolExecutor(max_workers=args.workers) as executor:
        fs = [executor.submit(typecheck_job, tsc_path, subdir, short_subdir, in_directory, out_directory)
              for subdir, short_subdir in zip(subdirs, short_subdirs)]

        for f in futures.as_completed(fs):
            result = f.result()
            name = result.name
            counter += 1

            print("[{}/{}] {} ... ".format(counter, num_subdirs, name), end="", flush=True)
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

def run_pipeline_step(pipeline_step, description, *args):
    start_time = datetime.now()
    pipeline_step(*args)
    end_time = datetime.now()

    duration = end_time - start_time
    total_seconds = round(duration.total_seconds())
    hours, remainder = divmod(total_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    print(f"Time for {description}: {hours}:{minutes:02}:{seconds:02}")

def main():
    args = parse_args()
    print("Source directory: {}".format(args.directory))
    print("Dataset: {}".format(args.dataset))

    if args.infer and args.engine == "DeepTyper":
        deeptyper = type_inference.DeepTyper(args)
        run_pipeline_step(deeptyper.run, "type inference")
    elif args.infer and args.engine == "LambdaNet":
        lambdanet = type_inference.LambdaNet(args)
        run_pipeline_step(lambdanet.run, "type inference")

    if args.weave:
        run_pipeline_step(type_weaving.weave_types, "type weaving", args)

    if args.typecheck:
        run_pipeline_step(typecheck, "type checking", args)

if __name__ == "__main__":
    main()
