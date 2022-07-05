from datetime import datetime
from pathlib import Path
from subprocess import PIPE
import argparse, subprocess
import time

# TODO: cleanup and document
# maybe have a counter of all files, not just the ones in a package

ANSI_RED = "\033[0;31m"
ANSI_GREEN = "\033[0;32m"
ANSI_YELLOW = "\033[0;33m"
ANSI_RESET = "\033[0m"

def parse_args():
    parser = argparse.ArgumentParser(description="JavaScript type inference runner script.")
    parser.add_argument("directory", help="contains JavaScript packages to infer types for")
    group = parser.add_argument_group(title="pipeline step", description="One of the pipeline steps to run. At least one step is required.")
    group.add_argument("--infer", action="store_true")

    args = parser.parse_args()
    if not args.infer:
        parser.print_usage()
        print("{}: error: at least one pipeline step argument is required".format(parser.prog))
        exit(2)

    if not Path(args.directory).exists():
        parser.print_usage()
        print("{}: error: directory {} does not exist".format(parser.prog, args.directory))
        exit(2)

    return args

def deeptyper_infer(directory):
    deeptyper_path = Path(Path(__file__).parent, "..", "DeepTyper", "pretrained", "readout.py").resolve()
    if not deeptyper_path.exists():
        print("Could not find DeepTyper script: {}".format(deeptyper_path))
        exit(1)
    print("Using DeepTyper script: {}".format(deeptyper_path))

    # Create the out directory, if it doesn't already exist
    out_directory = Path(directory, "..", "DeepTyper-out", "predictions").resolve()
    out_directory.mkdir(parents=True, exist_ok=True)
    print("Output directory: {}".format(out_directory))

    subdirs = sorted([sd.resolve() for sd in directory.iterdir()])
    short_subdirs = [sd.relative_to(directory) for sd in subdirs]
    num_subdirs = len(subdirs)
    print("{} packages found".format(num_subdirs))

    for i, (subdir, short_subdir) in enumerate(zip(subdirs, short_subdirs)):
        out_subdir = Path(out_directory, short_subdir).resolve()

        files = sorted([f.resolve() for f in subdir.rglob("*.js") if f.is_file()])
        short_files = [f.relative_to(directory) for f in files]
        num_files = len(files)

        for j, (file, short_file) in enumerate(zip(files, short_files)):
            print("[{}/{},{}/{}] Inferring types for {}... ".format(i+1, num_subdirs, j+1, num_files, short_file), end="", flush=True)

            csv_file = Path(out_directory, short_file).resolve().with_suffix(".csv")
            err_file = csv_file.with_suffix(".err")

            # If either file exists and the timestamps are newer than the input, then skip
            if csv_file.exists() or err_file.exists():
                input_mtime = file.stat().st_mtime
                output_mtime = csv_file.stat().st_mtime if csv_file.exists() else err_file.stat().st_mtime
                if input_mtime < output_mtime:
                    print(ANSI_YELLOW + "[SKIP]" + ANSI_RESET, flush=True)
                    continue

            # Run DeepTyper if the output files do not exist,
            # or the output file timestamps are older than the input
            args = ["python", deeptyper_path.name, file]
            result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=deeptyper_path.parent)

            # Create target directories for output
            csv_file.parent.mkdir(parents=True, exist_ok=True)

            if result.returncode == 0:
                csv_output = file.with_suffix(".csv")
                if not csv_output.exists():
                    print("Error: expected .csv file to be created on successful run")
                else:
                    csv_output.rename(csv_file)
                    print(ANSI_GREEN + "[ OK ]" + ANSI_RESET, flush=True)

                # If there are warnings, capture them too
                if result.stderr:
                    warn_file = csv_file.with_suffix(".warn")
                    with open(warn_file, mode="w", encoding="utf-8") as f:
                        print(result.stderr, file=f)
            else:
                with open(err_file, mode="w", encoding="utf-8") as f:
                    print(result.stderr, file=f)
                print(ANSI_RED + "[FAIL]" + ANSI_RESET, flush=True)

def main():
    args = parse_args()
    directory = Path(args.directory).resolve()
    print("Source directory: {}".format(directory))

    if args.infer:
        print("Inferring types with: DeepTyper")

        start_time = datetime.now()
        deeptyper_infer(directory)
        end_time = datetime.now()

        duration = end_time - start_time
        print("Finished inferring types")
        print("Time to infer types: {}".format(duration))

main()
