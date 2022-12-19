from datetime import datetime
from pathlib import Path
import argparse, os

import type_inference, type_weaving, type_checking
import util

def parse_args():
    cpu_count = os.cpu_count();

    parser = argparse.ArgumentParser(description="JavaScript to TypeScript migration script.")
    parser.add_argument(
        "--engine",
        required=True,
        choices=["DeepTyper", "LambdaNet", "InCoder"],
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
        "--infer-out",
        default="baseline",
        help="name of directory (within DIRECTORY) to write TypeScript, when the engine is InCoder; defaults to baseline")
    parser.add_argument(
        "--workers",
        type=int,
        default=cpu_count,
        help=f"maximum number of workers to use, defaults to {cpu_count}, the number of processors on the machine")
    parser.add_argument(
        "--emit-declaration",
        help="only for type checking; emit .d.ts declaration files",
        action="store_true")
    parser.add_argument(
        "--no-containers",
        default=False,
        action="store_true",
        help="run tools without using containers")

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
        metavar="TYPECHECK",
        help="run type checking on directory TYPECHECK (within DIRECTORY)")

    args = parser.parse_args()
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

def run_pipeline_step(pipeline_step, description, *args):
    start_time = datetime.now()
    pipeline_step(*args)
    end_time = datetime.now()

    duration = end_time - start_time
    total_seconds = round(duration.total_seconds())
    hours, remainder = divmod(total_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    # print(f"Time for {description}: {hours}:{minutes:02}:{seconds:02}")

def main():
    args = parse_args()
    # print("Source directory: {}".format(args.directory))
    # print("Dataset: {}".format(args.dataset))

    if args.infer and args.engine == "DeepTyper":
        deeptyper = type_inference.DeepTyper(args)
        run_pipeline_step(deeptyper.run, "type inference")
    elif args.infer and args.engine == "LambdaNet":
        lambdanet = type_inference.LambdaNet(args)
        run_pipeline_step(lambdanet.run, "type inference")
    elif args.infer and args.engine == "InCoder":
        incoder = type_inference.InCoder(args)
        run_pipeline_step(incoder.run, "type inference")

    if args.weave:
        type_weaver = type_weaving.TypeWeaver(args)
        run_pipeline_step(type_weaver.run, "type weaving")

    if args.typecheck:
        type_checker = type_checking.TypeChecker(args)
        run_pipeline_step(type_checker.run, "type checking")

if __name__ == "__main__":
    main()
