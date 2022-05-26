# type-inserter

This tool parses an unannotated JavaScript file and associated CSV file
containing type predictions, and outputs a valid TypeScript file.

Currently, only the DeepTyper CSV format is supported.

## Setup and build

    npm install
    tsc index.ts

## Running

    node index.js path/to/file.js   # assumes path/to/file.csv also exists
                                    # outputs path/to/file.ts
