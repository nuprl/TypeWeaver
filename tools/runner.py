from concurrent import futures
from datetime import datetime
from enum import Enum
from pathlib import Path
from subprocess import PIPE
import argparse, os, subprocess

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
        help="maximum number of workers to use, defaults to {}, the number of processors on the machine".format(cpu_count))

    # TODO: other useful flags: force

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
    if not (args.infer or args.weave or args.typecheck):
        parser.print_usage()
        print("{}: error: at least one pipeline step argument is required".format(parser.prog))
        exit(2)

    if not Path(args.directory).exists():
        parser.print_usage()
        print("{}: error: directory {} does not exist".format(parser.prog, args.directory))
        exit(2)

    dataset_source = Path(args.directory, "original", args.dataset).resolve()
    if not dataset_source.exists():
        parser.print_usage()
        print("{}: error: directory {} does not exist".format(parser.prog, dataset_source))
        exit(2)

    return args

def deeptyper_infer(args):
    """Run DeepTyper's type inference on the JavaScript projects within the given directory."""

    directory = Path(args.directory).resolve()
    dataset = Path(args.dataset)

    deeptyper_path = Path(Path(__file__).parent, "..", "DeepTyper", "pretrained", "readout.py").resolve()
    if not deeptyper_path.exists():
        print("Could not find DeepTyper: {}".format(deeptyper_path))
        exit(1)
    print("Inferring types with DeepTyper: {}".format(deeptyper_path))

    in_directory = Path(directory, "original", dataset).resolve()
    print("Input directory: {}".format(in_directory))

    # Create the out directory, if it doesn't already exist
    out_directory = Path(directory, "DeepTyper-out", dataset, "predictions").resolve()
    out_directory.mkdir(parents=True, exist_ok=True)
    print("Output directory: {}".format(out_directory))

    subdirs = sorted([sd.resolve() for sd in in_directory.iterdir()])
    short_subdirs = [sd.relative_to(in_directory) for sd in subdirs]

    num_subdirs = len(subdirs)
    num_files = len([f.resolve()
                     for subdir in subdirs
                     for f in subdir.rglob("*.js") if f.is_file()])
    print("Found {} files in {} packages".format(num_files, num_subdirs))

    i = 0
    num_ok = 0
    num_fail = 0
    num_skip = 0

    for subdir, short_subdir in zip(subdirs, short_subdirs):
        files = sorted([f.resolve() for f in subdir.rglob("*.js") if f.is_file()])
        short_files = [f.relative_to(in_directory) for f in files]

        for file, short_file in zip(files, short_files):
            i += 1
            print("[{}/{}] {} ... ".format(i, num_files, short_file), end="", flush=True)

            csv_file = Path(out_directory, short_file).resolve().with_suffix(".csv")
            err_file = csv_file.with_suffix(".err")

            # If either file exists and the timestamps are newer than the input, then skip
            if csv_file.exists() or err_file.exists():
                input_mtime = file.stat().st_mtime
                output_mtime = csv_file.stat().st_mtime if csv_file.exists() else err_file.stat().st_mtime
                if input_mtime < output_mtime:
                    num_skip += 1
                    print(ANSI_YELLOW + "[SKIP]" + ANSI_RESET, flush=True)
                    continue

            # Delete the old files
            if csv_file.exists():
                csv_file.unlink()
            if err_file.exists():
                err_file.unlink()

            # Run DeepTyper if the output files do not exist,
            # or the output file timestamps are older than the input
            args = ["python", deeptyper_path.name, file]
            result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=deeptyper_path.parent)

            # Create target directories for output
            csv_file.parent.mkdir(parents=True, exist_ok=True)

            if result.returncode == 0:
                csv_output = file.with_suffix(".csv")
                if csv_output.exists():
                    csv_output.rename(csv_file)
                    num_ok += 1
                    print(ANSI_GREEN + "[ OK ]" + ANSI_RESET, flush=True)
                else:
                    print("Error: expected .csv file to be created on successful run")

                # DeepTyper warnings are unhelpful; every execution generates warnings
                # if result.stderr:
                #     warn_file = csv_file.with_suffix(".warn")
                #     with open(warn_file, mode="w", encoding="utf-8") as f:
                #         print(result.stderr, file=f)
            else:
                with open(err_file, mode="w", encoding="utf-8") as f:
                    print(result.stderr, file=f)
                num_fail += 1
                print(ANSI_RED + "[FAIL]" + ANSI_RESET, flush=True)

    print("Number of successes: {}".format(num_ok))
    print("Number of fails: {}".format(num_fail))
    print("Number of skips: {}".format(num_skip))

def weave_types_job(type_inserter_path, csv_file, js_file, short_file, out_directory):
    ts_file = Path(out_directory, short_file).resolve().with_suffix(".ts")
    err_file = ts_file.with_suffix(".err")
    warn_file = ts_file.with_suffix(".warn")

    # Confirm that the JS file actually exists; we only assumed it exists based on the CSV file
    if not js_file.exists():
        return Result(short_file, ResultStatus.SKIP, "{}[SKIP]{} Missing JavaScript file!".format(ANSI_YELLOW, ANSI_RESET))

    # If either file exists and the timestamps are newer than the input, then skip
    if ts_file.exists() or err_file.exists():
        input_mtime = csv_file.stat().st_mtime
        output_mtime = ts_file.stat().st_mtime if ts_file.exists() else err_file.stat().st_mtime
        if input_mtime < output_mtime:
            return Result(short_file, ResultStatus.SKIP, "{}[SKIP]{}".format(ANSI_YELLOW, ANSI_RESET))

    # Delete the old files
    if ts_file.exists():
        ts_file.unlink()
    if err_file.exists():
        err_file.unlink()
    if warn_file.exists():
        warn_file.unlink()

    # Run type-inserter if the output files do not exist,
    # or the output file timestamps are older than the input
    args = ["node", type_inserter_path.name, js_file, csv_file]
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=type_inserter_path.parent)

    # Create target directories for output
    ts_file.parent.mkdir(parents=True, exist_ok=True)

    if result.returncode == 0:
        if result.stderr:
            with open(warn_file, mode="w", encoding="utf-8") as f:
                print(result.stderr, file=f)

        ts_output = js_file.with_suffix(".ts")
        if ts_output.exists():
            ts_output.rename(ts_file)
            return Result(short_file, ResultStatus.OK, "{}[ OK ]{}".format(ANSI_GREEN, ANSI_RESET))
        else:
            return Result(short_file, ResultStatus.FAIL, "Error: expected .ts file to be created on successful run")
    else:
        with open(err_file, mode="w", encoding="utf-8") as f:
            print(result.stderr, file=f)
            return Result(short_file, ResultStatus.FAIL, "{}[FAIL]{}".format(ANSI_RED, ANSI_RESET))

def weave_types(args):
    """Run type weaving to combine JavaScript and the associated CSV file (with type predictions) to produce TypeScript."""

    directory = Path(args.directory).resolve()
    dataset = Path(args.dataset)
    weaveout_dir = Path(args.weave)

    type_inserter_path = Path(Path(__file__).parent, "type-inserter", "index.js").resolve()
    if not type_inserter_path.exists():
        print("Could not find type-inserter: {}".format(type_inserter_path))
        exit(1)
    print("Weaving types with: {}".format(type_inserter_path))

    # Set up the input directories (JavaScript and CSV)
    js_in_directory = Path(directory, "original", dataset).resolve()
    csv_in_directory = Path(directory, "DeepTyper-out", dataset, "predictions").resolve()
    if not csv_in_directory.exists():
        print("error: type predictions directory {} does not exist".format(csv_in_directory))
        exit(1)
    print("Input directory (JavaScript): {}".format(js_in_directory))
    print("Input directory (type predictions): {}".format(csv_in_directory))

    # Create the out directory, if it doesn't already exist
    out_directory = Path(directory, "DeepTyper-out", dataset, weaveout_dir).resolve()
    out_directory.mkdir(parents=True, exist_ok=True)
    print("Output directory: {}".format(out_directory))

    # Not all JS files have predictions, so base our subdirectories and files on the csv_in_directory
    csv_subdirs = sorted([sd.resolve() for sd in csv_in_directory.iterdir()])
    short_subdirs = [sd.relative_to(csv_in_directory) for sd in csv_subdirs]
    js_subdirs = [Path(js_in_directory, d).resolve() for d in short_subdirs]

    csv_files = [f.resolve()
                 for subdir in csv_subdirs
                 for f in subdir.rglob("*.csv") if f.is_file()]
    short_files = [f.relative_to(csv_in_directory) for f in csv_files]
    js_files = [Path(js_in_directory, f).resolve().with_suffix(".js") for f in short_files]

    num_subdirs = len(csv_subdirs)
    num_files = len(csv_files)
    print("Found {} files in {} packages".format(num_files, num_subdirs))

    counter = 0
    num_ok = 0
    num_fail = 0
    num_skip = 0

    with futures.ProcessPoolExecutor(max_workers=args.workers) as executor:
        fs = [executor.submit(weave_types_job, type_inserter_path, csv_file, js_file, short_file, out_directory)
              for csv_file, js_file, short_file in zip(csv_files, js_files, short_files)]

        for f in futures.as_completed(fs):
            result = f.result()
            name = result.name
            counter += 1

            print("[{}/{}] {} ... ".format(counter, num_files, name), end="", flush=True)
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

    tsc_path = Path(Path(__file__).parent, "node_modules", ".bin", "tsc").resolve()
    if not tsc_path.exists():
        print("Could not find tsc: {}".format(tsc_path))
        exit(1)
    print("Type checking with: {}".format(tsc_path))

    # Set up the input directories
    in_directory = Path(directory, "DeepTyper-out", dataset, typecheck_dir).resolve()
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
    total_seconds = duration.seconds
    hours, remainder = divmod(total_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    print(f"Time for {description}: {hours}:{minutes:02}:{seconds:02}")

def main():
    args = parse_args()
    print("Source directory: {}".format(args.directory))
    print("Dataset: {}".format(args.dataset))

    if args.infer:
        run_pipeline_step(deeptyper_infer, "type inference", args)

    if args.weave:
        run_pipeline_step(weave_types, "type weaving", args)

    if args.typecheck:
        run_pipeline_step(typecheck, "type checking", args)

if __name__ == "__main__":
    main()
