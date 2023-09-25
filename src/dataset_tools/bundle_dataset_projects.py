# This script iterates over one or more directories containing JavaScript packages,
# and uses rollup to bundle each package into a single file, to create a dataset of
# single-file projects.

from concurrent import futures
from datasets import Dataset
from pathlib import Path
from subprocess import DEVNULL
from tempfile import TemporaryDirectory
from tqdm import tqdm
import argparse, json, os, subprocess

import util

ROLLUP_PATH = Path(Path(__file__).parent, "node_modules", ".bin", "rollup").resolve()
if not Path(ROLLUP_PATH).exists():
    print(f"Could not find rollup executable: {ROLLUP_PATH}")
    exit(1)
PLUGIN_PATH = Path(Path(__file__).parent, "rollup-plugin-insert-filename.mjs").resolve()
if not Path(PLUGIN_PATH).exists():
    print(f"Could not find rollup plugin: {PLUGIN_PATH}")
    exit(1)

def parse_args():
    # os.cpu_count() is the number of CPUs on the system,
    # not the number available to the current process
    cpu_count = len(os.sched_getaffinity(0))

    parser = argparse.ArgumentParser(
        description="Bundles JavaScript packages into single-file packages")
    parser.add_argument(
        "--dataset",
        type=str,
        nargs="+",
        required=True,
        help="one or more directories that contain JavaScript packages")
    parser.add_argument(
        "--output",
        type=str,
        required=True,
        help="name of directory or file to write dataset (in Hugging Face format)")
    parser.add_argument(
        "--write-files",
        action="store_true",
        help="write files instead of Hugging Face dataset")
    parser.add_argument(
        "--workers",
        type=int,
        default=cpu_count,
        help=f"maximum number of workers to use, defaults to {cpu_count}, the number of available processors")

    args = parser.parse_args()
    for d in args.dataset:
        util.check_exists(d)

    return args

def get_entrypoint(package):
    # Try the following entrypoints:
    # index.js, package.js,
    # src/index.js, src/main.js, src/package.js,
    # lib/index.js, lib/main.js, lib/package.js
    entrypoint_guesses = [
        Path(package, "index.js"),
        Path(package, Path(package).name).with_suffix(".js"),
        Path(package, "src", "index.js"),
        Path(package, "src", "main.js"),
        Path(package, "src", Path(package).name).with_suffix(".js"),
        Path(package, "lib", "index.js"),
        Path(package, "lib", "main.js"),
        Path(package, "lib", Path(package).name).with_suffix(".js"),
    ]

    for entrypoint in entrypoint_guesses:
        if entrypoint.is_file():
            return entrypoint

    # Try looking in package.json
    package_json = Path(package, "package.json")
    if not package_json.exists():
        return None

    with open(package_json) as f:
        d = json.load(f)
        if "main" in d.keys():
            # Try package.json main
            entrypoint = Path(package, d["main"])
            if entrypoint.is_file():
                return entrypoint

            # Try appending ".js"
            entrypoint = Path(package, d["main"]).with_suffix(".js")
            if entrypoint.is_file():
                return entrypoint

    return None

def bundle_package(package, output_dir):
    # Saves output in output_dir (if --write-files was specified)
    # or a temporary directory for further processing
    entrypoint = get_entrypoint(package)
    if not entrypoint:
        return None

    relative_entrypoint = Path(entrypoint).relative_to(package)

    package_name = package.parts[-1]
    dataset = package.parts[-2]
    outfile = Path(output_dir, dataset, package.parts[-1]).with_suffix(".ts")

    args = [
        ROLLUP_PATH,
        relative_entrypoint,
        "--plugin",
        f"commonjs,node-resolve,{PLUGIN_PATH}",
        "--file",
        outfile
    ]
    result = subprocess.run(args, stderr=DEVNULL, encoding="utf-8", cwd=package)

def fs_to_dataset(tmpdir, output):
    packages = sorted([p.resolve()
                       for d in Path(tmpdir).iterdir()
                       for p in Path(d).resolve().iterdir()])

    for p in packages:
        package_name = p.with_suffix("").parts[-1]
        dataset_name = p.parts[-2]
        content = p.read_text("utf-8")
        size = len(content.encode("utf-8"))

        yield {
            "name": package_name,
            "dataset": dataset_name,
            "size": size,
            "content": content,
            "content_without_annotations": content
        }

def main():
    args = parse_args()
    dataset_dirs = args.dataset
    output = args.output
    write_files = args.write_files
    workers = args.workers

    tempdir = None
    if write_files:
        output_dir = Path(output).resolve()
        output_dir.mkdir(parents=True, exist_ok=True)
    else:
        tempdir = TemporaryDirectory()
        output_dir = tempdir.name

    packages = sorted([p.resolve()
                       for d in dataset_dirs
                       for p in Path(d).resolve().iterdir()])

    with futures.ProcessPoolExecutor(max_workers=workers) as executor:
        fs = [executor.submit(bundle_package, p, output_dir)
              for p in packages]
        [f.result() for f in tqdm(fs)]

    if tempdir:
        # tempdir means we didn't want to write to filesystem, so need to create dataset
        dataset = Dataset.from_generator(
            fs_to_dataset,
            gen_kwargs={"tmpdir": output_dir, "output": output}
        )

        # write dataset
        if output.endswith(".parquet"):
            dataset.to_parquet(output)
        elif output.endswith(".jsonl"):
            dataset.to_json(output)
        else:
            dataset.save_to_disk(output, num_proc=workers)

        tempdir.cleanup()

if __name__ == "__main__":
    main()
