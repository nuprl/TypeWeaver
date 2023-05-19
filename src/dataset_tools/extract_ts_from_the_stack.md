# extract_ts_from_the_stack

This README contains instructions for running `extract_ts_from_the_stack.py` to
construct the training and evaluation datasets.

## Install dependencies

  1. Install dependencies:
     - git
     - Python +3.9
     - `pip install datasets tqdm transformers tree-sitter`
     - `git clone git@github.com:tree-sitter/tree-sitter-typescript.git`
  2. Edit `extract_ts_from_the_stack.py` lines 30 and 31, so that `LANGUAGES_SO`
     and `TREE_SITTER_TS` point to the right location
       - `build/languages.so` will be created by the script, and `build` should
         be in the same directory as `tree-sitter-typescript`

## Create training dataset

The training dataset is 40 GB. We will release it on the Hugging Face Hub when
we can deanonymize.

We are providing the scripts and instructions for creating the dataset on your
own.

  1. Make sure you have access to
     [The Stack](https://huggingface.co/datasets/bigcode/the-stack-dedup). You
     will need a Hugging Face account and will have to login on the commmand
     line.

  2. To create the dataset and save it to the directory `ts-training`, run:

```
python extract_ts_from_the_stack.py \
    --from-hf \
    --cutoff \
    --invert-cutoff \
    --output ts-training
```

  3. Create a repository on the Hugging Face Hub and ensure you have push access
     to it.

  4. Push the training dataset to the Hugging Face Hub:

```
python -c 'from datasets import load_from_disk; \
    training = load_from_disk("ts-training"); \
    training.push_to_hub(<YOUR_HF_REPO>, split="train", token=<YOUR_HF_TOKEN>)'
```

## Create evaluation dataset

We include the evaluation dataset in the supplemental materials. We also provide
instructions for rebuilding it from scratch.

  1. Make sure you have access to
     [The Stack](https://huggingface.co/datasets/bigcode/the-stack-dedup). You
     will need a Hugging Face account and will have to login on the commmand
     line.

  2. Run the following command. This can take 20-24 hours on a machine with 50
     cores.

```
  python src/dataset_tools/extract_ts_from_the_stack.py \
    --from-hf \
    --parse \
    --typecheck \
    --metrics \
    --tokenize \
    --filter \
    --cutoff \
    --unannotate \
    --output datasets/ts-eval.jsonl
```
