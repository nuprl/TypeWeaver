# weaver

This tool parses an unannotated JavaScript file and associated CSV file
containing type predictions, and outputs a valid TypeScript file.

## Setup and build

    make build

## Running

    ./run.sh /data/path/to/file.js --format DeepTyper

Alternatively:

    make shell      # attach a shell to the container
    node index.js /data/path/to/file.js --format DeepTyper
    exit            # exit the container

The container mounts the artifact directory `../data` to `/data` within the
container filesystem.

`run.sh` _must_ be executed from within this directory.

## CSV location

By default, the CSV file is expected to be in the same directory as the
JavaScript file.

The CSV file path can be provided explicitly:

    ./run.sh /data/path/to/file.js --format DeepTyper --types /data/path/to/file.csv

## Extra tools

The `tsc` script exposes the TypeScript compiler that was installed in the
container. Similar to `run.sh`, it _must_ be executed from within this
directory, and mount `../data` to `/data`.

## Dependencies

We recommend using the provided Dockerfile. If this is not an option, you can
manually set up the dependencies:

* Node.js 18.12.1

To install the Node packages and compile the TypeScript source:

    cd src
    npm install
    tsc
