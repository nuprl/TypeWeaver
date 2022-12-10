# weaver

This tool parses an unannotated JavaScript file and associated CSV file
containing type predictions, and outputs a valid TypeScript file.

## Setup and build

    make build

## Running

    ./run.sh --format DeepTyper \
        /data/playground/original/demo/example-program/main.js

Alternatively:

    make shell      # attach a shell to the container
    node index.js --format DeepTyper \
        /data/playground/original/demo/example-program/main.js
    exit            # exit the container

The container mounts the artifact directory `../data` to `/data` within the
container filesystem.

`run.sh` _must_ be executed from within this directory.

## CSV location

By default, the CSV file is expected to be in the same directory as the
JavaScript file.

The CSV file can be provided explicitly:

    ./run.sh --format DeepTyper \
        /data/playground/original/demo/example-program/main.js \
        --types /data/playground/original/demo/example-program/main.csv

## Extra tools

The `cjs-to-es6`, `cloc`, and `tsc` scripts expose the tools that were
installed in the container. Similar to `run.sh`, they _must_ be executed from
within this directory, and mount `../data` to `/data`.
