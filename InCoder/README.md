# Containerized InCoder

To build:

    make build

To run InCoder:

    ./run.sh --directories /data/path/to/project

Alternatively:

    make shell      # attach a shell to the container
    python3 main.py --directories /data/path/to/project
    exit            # exit the container

The container mounts the artifact directory `../data` to `/data` within the
container filesystem.

`run.sh` _must_ be executed from within this directory.

## InCoder interface

InCoder takes a _path to a JavaScript project_ as a _command-line argument_,
and outputs TypeScript in the same directory.

InCoder only predicts type annotations for function parameters.

## Dependencies

We recommend using the provided Dockerfile. If this is not an option, you can
manually set up the dependencies:

* Rust 1.61.0
* Python 3.10.6
    * The following Python packages:
      `accelerate`, `huggingface_hub`, `torch`, `transformers`

To install the Rust crates and compile the Rust source:

    cd src/rs
    cargo build

The model is 14 GB and is downloaded on the first run. To download and cache:

    cd src/py
    python3 cache_model.py
