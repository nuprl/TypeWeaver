from pathlib import Path
from subprocess import PIPE
import os, subprocess, sys

pid = os.getpid()

inputs_log = "type-inf-inputs.{}.txt".format(pid)
success_log = "type-inf-success.{}.txt".format(pid)
fail_log = "type-inf-fail.{}.txt".format(pid)
err_log = "type-inf-errs.{}.txt".format(pid)

current_path = Path(__file__).parent
deep_typer_path = Path(current_path, "..", "DeepTyper", "pretrained", "readout.py").resolve()

def printUsageAndExit(error):
    print(error)
    print("Usage: python infer-types.py <directory>")
    print("  <directory> is a directory of JavaScript repositories")
    exit(1)

if len(sys.argv) < 2:
    printUsageAndExit("No directory provided.")

path = Path(sys.argv[1])
if not path.exists():
    printUsageAndExit("Directory does not exist: {}".format(path))

if not deep_typer_path.exists():
    printUsageAndExit("Could not find DeepTyper script: {}".format(deep_typer_path))

# Recursively glob the provided path for *.js, but don't match directories
# Note: this could be slow, could be more efficient to glob each subdirectory
files = sorted([f for f in path.glob("**/*.js") if f.is_file()])
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
f_fail = open(fail_log, mode="w", encoding="utf-8")
f_err = open(err_log, mode="w", encoding="utf-8")

for i in range(0, num_files):
    short = short_filenames[i]
    full = full_filenames[i]
    csv = full.with_suffix(".csv")

    print("[{}/{}] Inferring types for {}...".format(i+1, num_files, short), end="", flush=True)

    # Skip if a previous run had already generated a CSV file
    if csv.exists() and csv.is_file():
        print(" \033[1;33m[SKIP]\033[0m")
        continue

    args = ["python", deep_typer_path.name, full]
    result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=deep_typer_path.parent)

    if result.returncode == 0:
        print(" \033[1;32m[ OK ]\033[0m")
        print(short, file=f_success)
    else:
        print(" \033[1;31m[FAIL]\033[0m")
        print(short, file=f_fail)
        print("=" * 40, short, "=" * 40, file=f_err)
        print(result.stderr, file=f_err)

f_success.close()
f_fail.close()
f_err.close()
