# Containerized LambdaNet

To build:

    make build

To run LambdaNet:

    echo "/data/path/to/project" | ./run.sh

Alternatively:

    make shell      # attach a shell to the container
    echo "/data/path/to/project" \
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

## Dependencies

We recommend using the provided Dockerfile. If this is not an option, you can
manually set up the dependencies:

* Node.js 18
* TypeScript 4.9.4
* OpenJDK 11
* Scala 2.12.10
* sbt 1.3.13

Then run:

    make NOCONTAINERS=true build

This will install Node packages, compile the TypeScript source, download sbt,
and compile the Scala source.
