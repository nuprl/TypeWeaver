from concurrent import futures
from pathlib import Path
from subprocess import PIPE
import subprocess, sys

inputs_log = "type-ins-inputs.txt"
success_log = "type-ins-success.txt"
warn_log = "type-ins-warn.txt"
fail_log = "type-ins-fail.txt"
err_log = "type-ins-errs.txt"

current_path = Path(__file__).parent
type_inserter_path = Path(current_path, "type-inserter", "index.js").resolve()

def printUsageAndExit(error):
    print(error)
    print("Usage: python insert-types.py <directory>")
    print("  <directory> is a directory of JavaScript repositories")
    exit(1)

if len(sys.argv) < 2:
    printUsageAndExit("No directory provided.")

path = Path(sys.argv[1])
if not path.exists():
    printUsageAndExit("Directory does not exist: {}".format(path))

if not type_inserter_path.exists():
    printUsageAndExit("Could not find type-inserter script: {}".format(type_inserter_path))

# Recursively glob the provided path for *.js, but don't match directories
# Also make sure a corresponding .csv file exists
# Note: this could be slow, could be more efficient to glob each subdirectory
files = sorted([f for f in path.glob("**/*.js") if f.is_file() and f.with_suffix(".csv").is_file()])
num_files = len(files)

# Remove the prefix from the filename path, to make logs cleaner
short_filenames = [Path(*f.parts[len(path.parts):len(f.parts)]) for f in files]

# make paths absolute since we need to change the working directory
full_filenames = [f.resolve() for f in files]

print("{} files found, saving to {}".format(num_files, inputs_log))
with open(inputs_log, mode="w", encoding="utf-8") as f_inputs:
    for f in short_filenames:
        print(f, file=f_inputs)

f_success = open(success_log, mode="w", encoding="utf-8")
f_warn = open(warn_log, mode="w", encoding="utf-8")
f_fail = open(fail_log, mode="w", encoding="utf-8")
f_err = open(err_log, mode="w", encoding="utf-8")

def job(i):
    args = ["node", type_inserter_path.name, full_filenames[i]]
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=type_inserter_path.parent)
    return i, result

with futures.ProcessPoolExecutor() as executor:
    counter = 0
    fs = [executor.submit(job, i) for i in range(0, num_files)]

    for f in futures.as_completed(fs):
        i, result = f.result()
        short = short_filenames[i]
        counter += 1

        print("[{}/{}] Inserted types into {}".format(counter, num_files, short), end="", flush=True)
        if result.returncode == 0:
            print(" \033[1;32m[ OK ]\033[0m")
            print(short, file=f_success, flush=True)
            if result.stderr:
                print("=" * 40, short, "=" * 40, file=f_warn)
                print(result.stderr, file=f_warn, flush=True)
        else:
            print(" \033[1;31m[FAIL]\033[0m")
            print(short, file=f_fail, flush=True)
            print("=" * 40, short, "=" * 40, file=f_err)
            print(result.stderr, file=f_err, flush=True)

f_success.close()
f_warn.close()
f_fail.close()
f_err.close()
