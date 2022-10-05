from pathlib import Path

import util

path = Path(util.tools_root, "..", "LambdaNet").resolve()
if not path.exists():
    print("Could not find LambdaNet: {}".format(path))
    exit(1)

def send_data_to(proc, data):
    proc.communicate(data)

def infer(args):
    """Run LambdaNet's type inference on the JavaScript projects within the given directory."""

    directory = Path(args.directory).resolve()
    dataset = Path(args.dataset)

    print("Inferring types with LambdaNet: {}".format(path))

    in_directory = Path(directory, "original", dataset).resolve()
    print("Input directory: {}".format(in_directory))

    # Create the out directory, if it doesn't already exist
    out_directory = Path(directory, "LambdaNet-out", dataset, "predictions").resolve()
    out_directory.mkdir(parents=True, exist_ok=True)
    print("Output directory: {}".format(out_directory))

    subdirs = sorted([sd.resolve() for sd in in_directory.iterdir() if len(list(sd.rglob("*.js")))])
    short_subdirs = [sd.relative_to(in_directory) for sd in subdirs]

    num_subdirs = len(subdirs)
    print("Found {} packages".format(num_subdirs))

    i = 0
    num_ok = 0
    num_fail = 0
    num_skip = 0

    skipped_subdirs = set()
    subdirs_to_run = []

    for subdir, short_subdir in zip(subdirs, short_subdirs):
        input_files = [f.resolve() for f in subdir.rglob("*.js") if f.is_file()]
        input_timestamps = sorted([f.stat().st_mtime for f in input_files], reverse=True)
        input_latest = input_timestamps[0] if input_timestamps else None

        output_dir = Path(out_directory, short_subdir).resolve()
        output_files = [f.resolve() for f in output_dir.rglob("*") if f.is_file() and (f.suffix == ".csv" or f.suffix == ".err")]
        output_timestamps = sorted([f.stat().st_mtime for f in output_files], reverse=True)
        output_latest = output_timestamps[0] if output_timestamps else None

        # If output timestamps are newer than input timestamps, then skip
        if input_latest and output_latest and input_latest < output_latest:
            num_skip += 1
            skipped_subdirs.add(short_subdir)
            continue

        # Update list of projects to process
        subdirs_to_run.append(str(subdir))

        # Delete the old output files
        for f in output_files:
            f.unlink()

    subdirs_string = "\n".join(subdirs_to_run)

    args = ["sbt", "runMain lambdanet.TypeInferenceService --writeDoneFile"]
    p = subprocess.Popen(args, stdin=PIPE, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=path)
    threading.Thread(target=send_data_to, args=[p, subdirs_string]).start()

    for subdir, short_subdir in zip(subdirs, short_subdirs):
        i += 1
        print("[{}/{}] {} ... ".format(i, num_subdirs, short_subdir), end="", flush=True)

        if short_subdir in skipped_subdirs:
            print(ANSI_YELLOW + "[SKIP]" + ANSI_RESET, flush=True)
            continue

        input_files = [f.resolve() for f in subdir.rglob("*.js") if f.is_file()]
        output_dir = Path(out_directory, short_subdir).resolve()

        done_file = Path(subdir, "done.ok")
        err_file = Path(subdir, "output.err")
        while True:
            if done_file.exists() or err_file.exists():
                break
            time.sleep(10)

        # Move output files to output directory, creating target directories if necessary
        csv_files = [f.with_suffix(".csv") for f in input_files]
        short_csv_files = [f.relative_to(subdir) for f in csv_files]
        for file, short_file in zip(csv_files, short_csv_files):
            if file.exists():
                output_file = Path(output_dir, short_file)
                output_file.parent.mkdir(parents=True, exist_ok=True)
                file.rename(output_file)

        if done_file.exists():
            # If no output file was produced (because the js file has no types), create a placeholder file anyway
            for f in short_csv_files:
                out_file = Path(output_dir, f)
                out_file.parent.mkdir(parents=True, exist_ok=True)
                out_file.touch(exist_ok=True)
            num_ok += 1
            done_file.unlink()
            print(ANSI_GREEN + "[ OK ]" + ANSI_RESET, flush=True)
        else:
            output_file = Path(output_dir, "output.err")
            output_file.parent.mkdir(parents=True, exist_ok=True)
            err_file = Path(subdir, "output.err")
            err_file.rename(output_file)
            num_fail += 1
            print(ANSI_RED + "[FAIL]" + ANSI_RESET, flush=True)

    # If we reach this point, either LambdaNet has finished processing everything,
    # or there was nothing left to process, so we can kill it
    p.terminate()

    print("Number of successes: {}".format(num_ok))
    print("Number of fails: {}".format(num_fail))
    print("Number of skips: {}".format(num_skip))

