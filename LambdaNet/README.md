# Containerized LambdaNet

To build:

    make build

To run LambdaNet:

    echo "/data/playground/original/demo/example-program/" | ./run.sh

Alternatively:

    make shell      # attach a shell to the container
    echo "/data/playground/original/demo/example-program/main.js" \
        | sbt "runMain lambdanet.TypeInferenceService"
    exit            # exit the container

The container mounts the artifact directory `../data` to `/data` within the
container filesystem.

`run.sh` _must_ be executed from within this directory.

## LambdaNet interface

LambdaNet reads a _path to a JavaScript project_ from _standard input_ and
outputs CSV files in that directory.

The output is in the format:

    start_line,start_col,end_line,end_col,type1,prob1,type2,prob2,type3,prob3,type4,prob4,type5,prob5

There are 5 predictions in total, separated by commas.

LambdaNet is aware of which identifiers are declarations, and does not produce
predictions for variable uses.
