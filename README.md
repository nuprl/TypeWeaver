# TypeWeaver-artifact

This is the artifact for the submitted paper:
_Do Machine Learning Models Produce TypeScript Types that Type Check?_

Please read the [ECOOP AE Submission Document](ECOOP_AE_Submission_Document.md)
for what this artifact comprises and how to get started.

This README contains information for running the full experiments, as well as
a reference for how the Makefile is set up and how the artifact is organized.

## Directory structure

- Type prediction models: `DeepTyper/`, `LambdaNet/`, and `InCoder/`
    - Each model is containerized
    - Each directory has a Makefile and a `run.sh` script

- Experiment data: `data/`
    - Input data: `full/`, `micro/`, `playground/`
        - These directories are structured similarly:
            - `original/` contains the input datasets; each dataset is a
              directory of JavaScript packages
            - `groundtruth/` contains TypeScript type declarations
              (`.d.ts` files) for the packages in `original/`, and are used in
              the evaluation as the ground truth of handwritten type annotations
            - `node_modules/` contains the type definitions of the package
              dependencies
            - Running the experiments will create directories for the output:
              `DeepTyper-out/`, `LambdaNet-out/`, and `InCoder-out/`
        - `full/` is for the full experiments
        - `micro/` contains only one package, and is used for
          "Getting Started" to test that everything is working
        - `playground/` is a directory for adding your own examples
    - Output data: `results/`
        - These are the results used in the paper
        - The raw outputs are `DeepTyper-out/`, `LambdaNet-out/`, and
          `InCoder-out/`
            - These directories are structured similarly, with one subdirectory
              per dataset; within each dataset:
                - `predictions/` (only for DeepTyper and LambdaNet): the
                  predicted type annotations in CSV format
                - `baseline/`: TypeScript code, the result of type weaving (for
                  DeepTyper and LambdaNet) or directly from predictions (for
                  InCoder)
                - `baseline-checked/`: the result of type checking the
                  TypeScript code; `.out` files means the package type checked
                  successfully
                - `baseline-typedefs/`: the `.d.ts` type declaration files,
                  extracted from the TypeScript code
        - `csv/`: CSV files with the raw outputs summarized and collected
        - `figures/`: tables (LaTeX) and graphs (PDFs) generated from the CSV
          files

- Tools and scripts: `src/`
    - `R/`: the (containerized) R script for generating tables and figures
      for the paper; requires CSV files in `data/full/csv/`
    - `dataset_tools/`: a collection of scripts used to construct the
      datasets; the scripts are not containerized and have not been tested with
      this artifact
    - `migrate_dataset/`: this script is used to invoke the various tools
      for predicting type annotations, type weaving, and type checking
    - `weaver/`: the (containerized) tool for type weaving; also includes other
      tools installed in the container environment
    - `convert_dataset_to_esm.py`: used by `make playground-es6` to convert the
      playground example to ECMAScript 6 modules
    - `summarize_results.py`: parses all the raw results to generate summary
      CSVs

## Experiment stages (and how to skip)

The experiment has multiple stages and produces intermediate results. Running
the full experiment on the provided VM may take over 30 hours (estimate), but
can be faster with more CPU cores and better disk performance.

The stages are the following:

1. Type annotation prediction
    - This step requires a GPU for the InCoder model, but InCoder can be
      skipped; see the "No GPU" section below for details
    - Reads JavaScript projects from `data/full/original/`
    - DeepTyper outputs CSV files to
      `data/full/DeepTyper-out/[dataset]/predictions/`
    - LambdaNet outputs CSV files to
      `data/full/LambdaNet-out/[dataset]/predictions/`
    - InCoder outputs TypeScript to
      `data/full/InCoder-out/[dataset]/baseline/`
    - This step may take over 15 hours on the provided VM; DeepTyper is the
      slowest step
    - **To skip this step:** `make partial-predictions` will copy precomputed
      results from `data/results/`, then you can run `make full`

2. Type weaving
    - Only for DeepTyper and LambdaNet
    - Reads JavaScript projects from `data/full/original/` and CSV files from
      `data/full/[system]-out/[dataset]/predictions/`
    - Outputs TypeScript to `data/full/[system]-out/[dataset]/baseline/`
    - This step may take over 12 hours on the provided VM; LambdaNet is
      significantly slower than DeepTyper
    - **To skip this step:** `make partial-weaving` will copy precomputed
      results from `data/results/`, then you can run `make full`

3. Type checking
    - Reads TypeScript projects from
      `data/full/[system]-out/[dataset]/baseline/`
    - Outputs status and error logs to
      `data/full/[system]-out/[dataset]/baseline-checked/`
      as well as type declaration files to
      `data/full/[system]-out/[dataset]/baseline-typedefs/`
    - This step may take over 3 hours on the provided VM
    - **To skip this step:** `make partial-checking` will copy precomputed
      results from `data/results/`, then you can run `make full`

4. Summarizing the results
    - Reads error logs and type declaration files from
      `data/full/[system]-out/[dataset]/baseline-checked/` and
      `data/full/[system]-out/[dataset]/baseline-typedefs/`
    - Writes CSV files to `data/full/csv/`
    - This step may take up to 80 minutes. In particular, the
      "Calculating LOC for each file in each package" step is very slow,
      but it only needs to run once for the entire dataset, and is not affected
      by the experiments. `src/summarize_results.py:358` can be commented out
      and `data/results/csv/file_loc.csv` can be copied over to
      `data/full/csv/`.

5. Generating the figures
    - Reads the CSV files from `data/full/csv/` and writes figures and tables to
      `data/full/figures/`
    - This step can be run directly with `make figures`
        - In this case, the tables and figures should match the paper
    - If `make full` is used, the final tables and figures may not match the
      paper. This is due to variance during the type annotation prediction
      stage, as well as different compiler versions producing different
      compilation errors.

## Makefile targets

The Makefile has the following targets:

- `build`: build the containers

- `micro`: run the micro dataset to test that the containers work

- `clean-micro`: reset the micro dataset state

- `playground-es6`: convert the playground examples to use ECMAScript 6 modules

- `playground`: predict type annotations and perform type weaving for the
  playground examples; does not do type checking

- `clean playground`: reset the playground state

- `full`: run the full experiments

- `clean-full`: reset the experiment state

- `partial-predictions`: copy the type annotation prediction results from the
  paper, allows skipping Step 1 when running `make full`

- `partial-weaving`: copy the type weaving results from the paper, allows
  skipping Step 2 when running `make full`

- `partial-checking`: copy the type checking results from the paper, allows
  skipping Step 3 when running `make full`

- `figures`: copy the CSV results from the paper and generates the figures;
  the tables and figures should match the paper

## Makefile variables

### No GPU

Setting this variable will skip the InCoder experiments, which require a GPU.
Instead, the InCoder results from the paper will be copied over.

    make NOGPU=true micro

### Number of processors

By default, `make full` will use all available processors on the machine.
This can be configured:

    make NPROC=8 full

The other targets only use a single processor.

### Docker

By default, we use Podman. To use Docker (or another container implementation),
set the `DOCKER` variable:

    make DOCKER=docker build
    make DOCKER=docker shell
    DOCKER=docker ./run.sh
