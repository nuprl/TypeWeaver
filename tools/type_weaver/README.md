# type_weaver

This tool parses an unannotated JavaScript file and associated CSV file
containing type predictions, and outputs a valid TypeScript file.

Currently, DeepTyper and LambdaNet are supported. Note that by default,
LambdaNet outputs in a non-CSV format; we use a modified version of LambdaNet.

## Setup and build

    npm install
    tsc index.ts

## Running

    node index.js examples/factors-dt.js --format DeepTyper

By default, `type_weaver` assumes that for an input file `file.js`, a
corresponding CSV file `file.csv` exists in the same directory, containing type
predictions in the specified format.

The CSV file can be provided explicitly:

    node index.js examples/factors-dt.js --format DeepTyper \
        --types examples/factors-dt.csv
