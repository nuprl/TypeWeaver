# Containerized InCoder

To build:

    make build

To run InCoder:

    ./run.sh --directories /data/playground/original/demo/example-program/

Alternatively:

    make shell      # attach a shell to the container
    python3 main.py --directories /data/playground/original/demo/example-program/
    exit            # exit the container

The container mounts the artifact directory `../data` to `/data` within the
container filesystem.

`run.sh` _must_ be executed from within this directory.

## InCoder interface

InCoder takes a _path to a JavaScript project_ as a _command-line argument_,
and outputs TypeScript in the same directory.

InCoder only predicts type annotations for function parameters.
