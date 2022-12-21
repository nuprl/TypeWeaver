# migrate_dataset

This is the script that invokes (containerized) tools (e.g. type prediction,
type weaving, type checking).

## Dependencies

* Python +3.6 with tqdm

## Example

    # From the artifact root
    python3 src/migrate_dataset/main.py \
        --directory data/micro \
        --dataset top1k-typed-nodeps-es6 \
        --model DeepTyper \
        --predict
    python3 src/migrate_dataset/main.py \
        --workers 1 \
        --directory data/micro \
        --dataset top1k-typed-nodeps-es6 \
        --model DeepTyper \
        --weave baseline
    python3 src/migrate_dataset/main.py \
        --workers 1 \
        --directory data/micro \
        --dataset top1k-typed-nodeps-es6 \
        --model DeepTyper \
        --emit-declaration \
        --typecheck baseline

## main.py

The main script is `main.py`, which runs the evaluation pipeline. The script
assumes a specific directory structure for the dataset and outputs. The script
runs incrementally, by checking the timestamps of inputs and outputs.

The top directory, `data/full` in this example, should be passed to `main.py`
with the `--directory data` option.

    data/full/
      |-- original/

`original` stores the input datasets. Each dataset is a collection of NPM
packages. This structure allows multiple datasets (including small test
datasets). The dataset must be specified, e.g. with the `--dataset corpus`
option.

    data/
      |-- original/
            |-- corpus/
            |-- test_dataset/

## Type Prediction

Running `main.py` with the `--predict` flag runs the type prediction step of the
pipeline. Specify the prediction model with `--model DeepTyper`.

As input, the script takes every `.js` file in `data/original/corpus` and
outputs a `.csv` file, containing type predictions, in
`DeepTyper-out/corpus/predictions`, mirroring the directory structure of
`data/original/corpus`. If type prediction fails, then a `.err` file is written
instead.

    data/
      |-- original/
      |     |-- corpus/
      |           |-- pkgA/
      |           |     |-- index.js
      |           |     |-- lib.js
      |           |-- pkgB/
      |                 |-- a.js
      |                 |-- b.js
      |                 |-- c.md
      |-- DeepTyper-out/
            |-- corpus/
                  |-- predictions/
                        |-- pkgA/
                        |     |-- index.csv
                        |     |-- lib.csv
                        |-- pkgB/
                              |-- a.csv
                              |-- b.err

In this example, type prediction on `pkgA/index.js`, `pkgA/lib.js`, and
`pkgB/a.js` succeeded, prediction on `pkgB/b.js` failed, and `pkgB/c.md` was
ignored.

## Type Weaving

Type weaving, specified with the `--weave baseline` flag (with `baseline` as
its argument), takes an original `.js` file and the predictions `.csv` file,
generating a `.ts` file with type annotations. If type weaving fails, a `.err`
file is generated. If type weaving results in warnings, the warnings are
captured in a `.warn` file.

The script reads its inputs from the `original/corpus` directory, as
well as `DeepTyper-out/corpus/predictions/`. Outputs are written to
`DeepTyper-out/corpus/baseline`.

    data/
      |-- original/
      |     |-- corpus/
      |           |-- pkgA/
      |           |     |-- index.js
      |           |     |-- lib.js
      |           |-- pkgB/
      |                 |-- a.js
      |                 |-- b.js
      |                 |-- c.md
      |-- DeepTyper-out/
            |-- corpus/
                  |-- predictions/
                  |     |-- pkgA/
                  |     |     |-- index.csv
                  |     |     |-- lib.csv
                  |     |-- pkgB/
                  |           |-- a.csv
                  |           |-- b.err
                  |-- baseline/
                        |-- pkgA/
                        |     |-- index.ts
                        |     |-- index.warn
                        |     |-- lib.ts
                        |-- pkgB/
                              |-- a.ts

In this example, type weaving succeeded on `pkgA/index.js` but generated a
warning. Weaving also succeeded on `pkgA/lib.js` and `pkgB/a.js`.

## Type Checking

Type checking runs on each package, rather than each file. All the `.ts` files 
for a package are passed to `tsc` on the command line. If type checking
succeeds, an empty `pkg.out` file is generated. Otherwise, `pkg.err` contains
the compilation errors.

Type checking is specified with the flag `--typecheck baseline`, where
`baseline` is the name of the directory to type check. This argument is
necessary, to allow different directories to be type checked.

    data/
      |-- DeepTyper-out/
            |-- corpus/
                  |-- baseline/
                  |     |-- pkgA/
                  |     |     |-- index.ts
                  |     |     |-- index.warn
                  |     |     |-- lib.ts
                  |     |-- pkgB/
                  |           |-- a.ts
                  |-- baseline-checked/
                        |-- pkgA.out
                        |-- pkgB.err

In this example, `pkgA` type checked successfuly (where both `index.ts` and
`lib.ts` were passed to the compiler as command-line arguments), while `pkgB`
did not type check successfully.
