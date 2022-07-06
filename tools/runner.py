from datetime import datetime
from pathlib import Path
from subprocess import PIPE
import argparse, subprocess

ANSI_RED = "\033[0;31m"
ANSI_GREEN = "\033[0;32m"
ANSI_YELLOW = "\033[0;33m"
ANSI_RESET = "\033[0m"

def parse_args():
    parser = argparse.ArgumentParser(description="JavaScript type inference runner script.")
    parser.add_argument("directory", help="contains JavaScript packages to infer types for")
    group = parser.add_argument_group(title="pipeline step", description="One of the pipeline steps to run. At least one step is required.")
    group.add_argument("--infer", help="Run type inference", action="store_true")

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
    print("Inferring types with DeepTyper: {}".format(deeptyper_path))

    # Create the out directory, if it doesn't already exist
    out_directory = Path(directory, "..", "DeepTyper-out", "predictions").resolve()
    out_directory.mkdir(parents=True, exist_ok=True)
    print("Output directory: {}".format(out_directory))

    subdirs = sorted([sd.resolve() for sd in directory.iterdir()])
    short_subdirs = [sd.relative_to(directory) for sd in subdirs]

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
        out_subdir = Path(out_directory, short_subdir).resolve()

        files = sorted([f.resolve() for f in subdir.rglob("*.js") if f.is_file()])
        short_files = [f.relative_to(directory) for f in files]

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

def main():
    args = parse_args()
    directory = Path(args.directory).resolve()
    print("Source directory: {}".format(directory))

    if args.infer:
        start_time = datetime.now()
        deeptyper_infer(directory)
        end_time = datetime.now()

        duration = end_time - start_time
        total_seconds = duration.seconds
        hours, remainder = divmod(total_seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        print(f"Time to infer types: {hours}:{minutes:02}:{seconds:02}")

main()
