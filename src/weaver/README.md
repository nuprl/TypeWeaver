# weaver

This tool parses an unannotated JavaScript file and associated CSV file
containing type predictions, and outputs a valid TypeScript file.

Currently, DeepTyper and LambdaNet are supported.

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

By default, the CSV file is expected to be in the same directory as the
JavaScript file.

The CSV file can be provided explicitly:

    ./run.sh --format DeepTyper \
        /data/playground/original/demo/example-program/main.js \
        --types /data/playground/original/demo/example-program/main.csv
