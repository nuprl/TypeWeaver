from concurrent import futures
from pathlib import Path
from subprocess import PIPE
import subprocess

from util import Result, ResultStatus

def weave_types_job(engine, type_weaver_path, csv_file, js_file, short_file, out_directory):
    ts_file = Path(out_directory, short_file).resolve().with_suffix(".ts")
    err_file = ts_file.with_suffix(".err")
    warn_file = ts_file.with_suffix(".warn")

    # Confirm that the JS file actually exists; we only assumed it exists based on the CSV file
    if not js_file.exists():
        return Result(short_file, ResultStatus.SKIP)

    # If either file exists and the timestamps are newer than the input, then skip
    if ts_file.exists() or err_file.exists():
        input_mtime = csv_file.stat().st_mtime
        output_mtime = ts_file.stat().st_mtime if ts_file.exists() else err_file.stat().st_mtime
        if input_mtime < output_mtime:
            return Result(short_file, ResultStatus.SKIP)

    # Delete the old files
    if ts_file.exists():
        ts_file.unlink()
    if err_file.exists():
        err_file.unlink()
    if warn_file.exists():
        warn_file.unlink()

    # Run type_weaver if the output files do not exist,
    # or the output file timestamps are older than the input
    args = ["node", type_weaver_path.name, "--format", engine, "--types", csv_file, js_file]
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=type_weaver_path.parent)

    # Create target directories for output
    ts_file.parent.mkdir(parents=True, exist_ok=True)

    if result.returncode == 0:
        if result.stderr:
            with open(warn_file, mode="w", encoding="utf-8") as f:
                print(result.stderr, file=f)

        ts_output = js_file.with_suffix(".ts")
        if ts_output.exists():
            ts_output.rename(ts_file)
            return Result(short_file, ResultStatus.OK)
        else:
            return Result(short_file, ResultStatus.FAIL) # "Error: expected .ts file to be created on successful run")
    else:
        with open(err_file, mode="w", encoding="utf-8") as f:
            print(result.stderr, file=f)
            return Result(short_file, ResultStatus.FAIL)

def weave_types(args):
    """Run type weaving to combine JavaScript and the associated CSV file (with type predictions) to produce TypeScript."""

    directory = Path(args.directory).resolve()
    dataset = Path(args.dataset)
    weaveout_dir = Path(args.weave)
    engine_dir = f"{args.engine}-out"

    type_weaver_path = Path(Path(__file__).parent, "..", "type_weaver", "index.js").resolve()
    if not type_weaver_path.exists():
        print("Could not find type_weaver: {}".format(type_weaver_path))
        exit(1)
    print("Weaving types with: {}".format(type_weaver_path))

    # Set up the input directories (JavaScript and CSV)
    js_in_directory = Path(directory, "original", dataset).resolve()
    csv_in_directory = Path(directory, engine_dir, dataset, "predictions").resolve()
    if not csv_in_directory.exists():
        print("error: type predictions directory {} does not exist".format(csv_in_directory))
        exit(1)
    print("Input directory (JavaScript): {}".format(js_in_directory))
    print("Input directory (type predictions): {}".format(csv_in_directory))

    # Create the out directory, if it doesn't already exist
    out_directory = Path(directory, engine_dir, dataset, weaveout_dir).resolve()
    out_directory.mkdir(parents=True, exist_ok=True)
    print("Output directory: {}".format(out_directory))

    # Not all JS files have predictions, so base our subdirectories and files on the csv_in_directory
    csv_subdirs = sorted([sd.resolve() for sd in csv_in_directory.iterdir()])
    short_subdirs = [sd.relative_to(csv_in_directory) for sd in csv_subdirs]
    js_subdirs = [Path(js_in_directory, d).resolve() for d in short_subdirs]

    csv_files = sorted([f.resolve()
                        for subdir in csv_subdirs
                        for f in subdir.rglob("*.csv") if f.is_file()])
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
        fs = [executor.submit(weave_types_job, args.engine, type_weaver_path, csv_file, js_file, short_file, out_directory)
              for csv_file, js_file, short_file in zip(csv_files, js_files, short_files)]

        for f in futures.as_completed(fs):
            result = f.result()
            name = result.name
            counter += 1

            print("[{}/{}] {} ... ".format(counter, num_files, name), end="", flush=True)
            print(result.message())
            if result.status is ResultStatus.OK:
                num_ok += 1
            elif result.status is ResultStatus.SKIP:
                num_skip += 1
            elif result.status is ResultStatus.FAIL:
                num_fail += 1

    print("Number of successes: {}".format(num_ok))
    print("Number of fails: {}".format(num_fail))
    print("Number of skips: {}".format(num_skip))
