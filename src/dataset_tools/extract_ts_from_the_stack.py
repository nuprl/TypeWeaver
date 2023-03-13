from concurrent import futures
from datasets import load_dataset
from pathlib import Path
from subprocess import PIPE
from tempfile import NamedTemporaryFile
from tqdm import tqdm
import argparse, os, pickle, re, subprocess

import util

# THE_STACK = "bigcode/the-stack-smol"
THE_STACK = "bigcode/the-stack-dedup"

TSC_PATH = Path(Path(__file__).parent, "node_modules", ".bin", "tsc").resolve()
if not Path(TSC_PATH).exists():
    print("Could not find cloc: {}".format(TSC_PATH))
    exit(1)

IMPORT_RE = re.compile("^\s*import(\*|\{|\s)")
REQUIRE_RE = re.compile("^.*\s+require\s*\(.+\)")
EXPORT_RE = re.compile("export[^\w_$]")
EXPORT_RE2 = re.compile("export[^\w_$]\s*(function|class|interface|type|enum|const|declare|default|async)")

def parse_args():
    cpu_count = os.cpu_count();

    parser = argparse.ArgumentParser(description="Extracts self-contained TypeScript files that type check")
    parser.add_argument(
        "--dataset-out",
        required=True,
        help=f"output directory to save resulting dataset")
    parser.add_argument(
        "--checkpoint",
        required=True,
        help=f"file for saving checkpoints")
    parser.add_argument(
        "--checkpoint-steps",
        type=int,
        default=1000,
        help="number of steps to save a checkpoint, defaults to 1000")
    parser.add_argument(
        "--workers",
        type=int,
        default=cpu_count,
        help=f"maximum number of workers to use, defaults to {cpu_count}, the number of processors on the machine")

    args = parser.parse_args()
    util.check_exists(args.dataset_out)

    return args

def self_contained(content):
    matches = any(l for l in content.splitlines()
                  if IMPORT_RE.match(l)
                  or REQUIRE_RE.match(l)
                  or (EXPORT_RE.match(l)
                      and not EXPORT_RE2.match(l))
                  or "<!DOCTYPE TS>" in l)
    return not matches

def run_tsc(key, content):
    with NamedTemporaryFile(mode="w", suffix=".ts", encoding="utf-8") as f:
        # Save content to temp file
        print(content, file=f, end="", flush=True)
        tmpfile = Path(f.name)

        # Run tsc on temp file
        args = [TSC_PATH, "--noEmit", "--lib", "es2021", tmpfile]
        result = subprocess.run(args, stdout=PIPE, stderr=PIPE, encoding="utf-8", cwd=tmpfile.parent)

        return key, result.returncode == 0

def get_key(dataset_example):
    if THE_STACK == "bigcode/the-stack-smol":
        return dataset_example["repository_name"] + "@@" + dataset_example["path"]
    else:
        return dataset_example["hexsha"]

def get_content(dataset_example):
    return dataset_example["content"]

def needs_processing(checkpoint, dataset_example):
    return get_key(dataset_example) not in checkpoint

def main():
    args = parse_args()
    workers = args.workers
    checkpoint_file = Path(args.checkpoint)
    checkpoint_steps = args.checkpoint_steps
    dataset_out = args.dataset_out

    # Load checkpoint file if it exists
    # TODO: may want to compress file
    checkpoint = {}
    if checkpoint_file.exists():
        with open(checkpoint_file, 'rb') as f:
            checkpoint = pickle.load(f)

    # features: content, avg_line_length, max_line_length, alphanum_fraction,
    # licenses, repository_name, path, size, lang
    print("Loading dataset", flush=True)
    dataset = load_dataset(THE_STACK,
                           data_dir="data/typescript",
                           split="train",
                           num_proc=workers)

    print("Filtering out import/export/require", flush=True)
    filtered = dataset.filter(lambda d: self_contained(d["content"]),
                              num_proc=workers)

    # TODO: this is very slow, could be parallelized
    print("Already typechecked:", len(checkpoint), flush=True)
    to_typecheck = [f for f in tqdm(filtered, desc="Applying checkpoint", unit="file")
                    if needs_processing(checkpoint, f)]

    print("To typecheck:", len(to_typecheck), flush=True)
    with futures.ProcessPoolExecutor(max_workers=workers) as executor:
        fs = [executor.submit(run_tsc, get_key(d), get_content(d))
              for d in to_typecheck]
        for i, f in enumerate(tqdm(fs, desc="Type checking", unit="file", miniters=1)):
            key, result = f.result()
            checkpoint[key] = result
            if (i + 1) % checkpoint_steps == 0:
                print("Saving checkpoint at step", i+1, flush=True)
                with open(checkpoint_file, 'wb') as f:
                    pickle.dump(checkpoint, f)

    print("Saving final checkpoint", flush=True)
    with open(checkpoint_file, 'wb') as f:
        pickle.dump(checkpoint, f)

    print("Filtering dataset for files that type check", flush=True)
    typechecks = filtered.filter(lambda d: checkpoint[get_key(d)],
                                 num_proc=workers)

    print("Saving result to", dataset_out, flush=True)
    typechecks.save_to_disk(dataset_out)

    print("Original dataset size:", len(dataset))
    print("Filtered dataset size:", len(filtered))
    print("Type checks dataset size:", len(typechecks), flush=True)

if __name__ == "__main__":
    main()
