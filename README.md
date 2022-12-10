# TypeWeaver-artifact

This is the artifact for the submitted paper:
_Do Machine Learning Models Produce TypeScript Types that Type Check?_

Please read the [ECOOP AE Submission Document](ECOOP_AE_Submission_Document.md)
for what this artifact comprises and how to get started.

This README contains information for running the full experiments, as well as
a reference for how the Makefile is set up and how the artifact is organized.


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

# Explaining the directory structure
