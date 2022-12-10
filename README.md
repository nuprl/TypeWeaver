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
    - Refer to the README for how to run the models

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
        - `full` is for the full experiments
        - `micro` contains only one package, and is used for
          "Getting Started" to test that everything is working
        - `playground` is a directory for adding your own examples
    - Output data: `results/`
        - These are the results used in the paper
        - The raw outputs are `DeepTyper-out/`, `LambdaNet-out`, and
          `InCoder-out`
            - These directories are structured similarly, with one subdirectory
              per dataset; within each dataset:
                - `predictions` (only for DeepTyper and LambdaNet): the
                  predicted type annotations in CSV format
                - `baseline`: TypeScript code, the result of type weaving (for
                  DeepTyper and LambdaNet) or directly from predictions (for
                  InCoder)
                - `baseline-checked`: the result of type checking the TypeScript
                  code; `.out` files means the package type checked
                  successfully
                - `baseline-typedefs`: the `.d.ts` type declaration files,
                  extracted from the TypeScript code
        - `csv/`: CSV files with the raw outputs summarized and collected
        - `figures/`: tables (LaTeX) and graphs (PDFs) generated from the CSV
          files

- Tools and scripts: `src/`
    - `R/`: the (containerized) R script for generating tables and figures
      for the paper; requires CSV files in `data/full/csv`
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



## Containers implementation

By default, we use Podman. To use Docker, set the `DOCKER` variable:

    make DOCKER=docker build
    make DOCKER=docker shell
    DOCKER=docker ./run.sh




## Experiment stages

The experiment has multiple stages and produces intermediate results. Running
the full experiment on the provided VM may take over 30 hours (estimate), but
can be faster with more CPU cores and better disk performance.


TODO, rough instructions, will be cleaned up

## Evaluation stages

The experiment has a number of stages:
1. Type annotation prediction
    - This step requires a GPU for the InCoder model
2. Type weaving
    - Only for DeepTyper and LambdaNet
3. Type checking
4. Summarizing the results
5. Generating the figures

## Makefile targets

The Makefile has rules for running the experiment.

- `make clean-micro`

- `make clean-full` will reset the experiment state

- `make full` will run the entire experiment, and may take over 30 hours.
  Type annotation prediction for DeepTyper is significantly slower than for
  LambdaNet or InCoder.

- `make partial-predictions` will copy the results of Step 1. Afterwards,
  `make full` will run the experiment from Step 2. This may take over 15 hours.
  Type weaving for LambdaNet is significantly slower than for DeepTyper.

- `make partial-weaving` will copy the results of Step 2. Afterwards,
  `make full` will run the experiment from Step 3. This may take over 3 hours.

- `make partial-checking` will copy the results of Step 3. Afterwards,
  `make full` will run the experiments from Step 4. This may take up to 80
  minutes. In particular, the "Calculating LOC for each file in each package"
  step is very slow, but it only needs to run once for the entire dataset, and
  is not affected by the experiments. `src/summarize_results.py:358` can be
  commented out.

Note that in the above steps, the final tables and figures may not match the
paper. This is due to variance during the type annotation prediction stage, as
well as different compiler versions producing different compilation errors.

- `make figures` will recreate the figures from the results used for the paper.
  The tables and figures should match the paper.

## Makefile variables

If you are using Docker instead of podman, you can run `make DOCKER=docker full`
and the makefiles and scripts should use Docker instead.

By default, the scripts will use all 12 CPUs on the server. To adjust this, run
`make NPROC=8 full` and the makefiles and scripts will use 8 processors.

If you do not have a GPU, run `make NOGPU=true full`.

