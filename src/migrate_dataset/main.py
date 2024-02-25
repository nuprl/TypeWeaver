from datetime import datetime
from pathlib import Path
import argparse, os

import type_prediction, type_weaving, type_checking
import util

def parse_args():
    cpu_count = os.cpu_count();

    parser = argparse.ArgumentParser(description="JavaScript to TypeScript migration script.")
    parser.add_argument(
        "--model",
        required=True,
        choices=["tsc", "DeepTyper", "LambdaNet", "InCoder", "SantaCoder"],
        help="model to use for type prediction, also determines the CSV format for type weaving and directory for type checking")
    parser.add_argument(
        "--directory",
        required=True,
        help="root directory containing input and output directories")
    parser.add_argument(
        "--dataset",
        required=True,
        help="name of directory (within DIRECTORY) that contains JavaScript packages")
    parser.add_argument(
        "--predict-out",
        default="baseline",
        help="name of directory (within DIRECTORY) to write TypeScript, when the model is tsc, InCoder, SantaCoder; defaults to baseline")
    parser.add_argument(
        "--workers",
        type=int,
        default=cpu_count,
        help=f"maximum number of workers to use, defaults to {cpu_count}, the number of processors on the machine")
    parser.add_argument(
        "--emit-declaration",
        action="store_true",
        help="only for type checking; emit .d.ts declaration files")
    parser.add_argument(
        "--no-containers",
        default=False,
        action="store_true",
        help="run tools without using containers")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="don't run anything, but print what would have been executed")

    group = parser.add_argument_group(
        title="migration step",
        description="One of the steps to run. At least one step is required.")
    group.add_argument(
        "--predict",
        help="run type prediction",
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
    if not (args.predict or args.weave or args.typecheck):
        parser.print_usage()
        print("error: at least one step argument is required")
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

def main():
    args = parse_args()
    if args.dry_run:
        print("########## DRY RUN: nothing being run ##########")
        print("Source directory: {}".format(args.directory))
        print("Dataset: {}".format(args.dataset))

    if args.predict:
        if args.model == "tsc":
            tsc = type_prediction.TypeScriptCompiler(args)
            tsc.run()
        if args.model == "DeepTyper":
            deeptyper = type_prediction.DeepTyper(args)
            deeptyper.run()
        elif args.model == "LambdaNet":
            lambdanet = type_prediction.LambdaNet(args)
            lambdanet.run()
        elif args.model == "InCoder":
            incoder = type_prediction.InCoder(args)
            incoder.run()
        elif args.model == "SantaCoder":
            santacoder = type_prediction.SantaCoder(args)
            santacoder.run()

    if args.weave:
        type_weaver = type_weaving.TypeWeaver(args)
        type_weaver.run()

    if args.typecheck:
        type_checker = type_checking.TypeChecker(args)
        type_checker.run()

if __name__ == "__main__":
    main()
