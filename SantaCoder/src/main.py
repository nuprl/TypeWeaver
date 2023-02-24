from pathlib import Path
import argparse, traceback

from type_inference import TypeInference

def _parse_args():
    parser = argparse.ArgumentParser(
        description="Runs SantaCoder to infer types for JavaScript",
        epilog="One of --files or --directories must be provided")

    parser.add_argument(
        "--files",
        nargs="+",
        help="JavaScript files to run type inference on")
    parser.add_argument(
        "--directories",
        nargs="+",
        help="JavaScript directories to run type inference on")
    parser.add_argument(
        "--write-done-file",
        action="store_true",
        help=argparse.SUPPRESS)

    args = parser.parse_args()

    if args.files and args.directories:
        parser.print_usage()
        print(f"error: one of --files or --directories must be provided, not both")
        exit(1)
    elif args.files:
        for f in args.files:
            if not Path(f).exists():
                parser.print_usage()
                print(f"error: file does not exist: {f}")
                exit(1)
    elif args.directories:
        for d in args.directories:
            if not Path(d).exists():
                parser.print_usage()
                print(f"error: directory does not exist: {d}")
                exit(1)
    else:
        parser.print_usage()
        print("error: need to provide arguments")
        exit(1)

    return args

def _infer_on_file(typeinf, input_file):
    output_file = input_file.with_suffix(".ts")
    error_file = input_file.with_suffix(".err")

    try:
        result = typeinf.infer(input_file)
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(result)
    except:
        error = traceback.format_exc()
        with open(error_file, "w", encoding="utf-8") as f:
            f.write(error)

def _infer_on_directory(typeinf, directory, write_done_file = False):
    files = sorted([f for f in directory.rglob("*.js") if f.is_file()])
    for f in files:
        _infer_on_file(typeinf, f)

    if write_done_file:
        done_file = Path(directory, "santacoder.done")
        done_file.touch(exist_ok=True)

def main():
    args = _parse_args()

    import model
    m = model.Model()
    typeinf = TypeInference(m)

    if args.files:
        for f in sorted(args.files):
            _infer_on_file(typeinf, Path(f))
    elif args.directories:
        for d in sorted(args.directories):
            _infer_on_directory(typeinf, Path(d), args.write_done_file)

if __name__ == "__main__":
    main()
