# Containerized DeepTyper

To build:

    make build

To run DeepTyper:

    ./run.sh /data/playground/original/demo/example-program/main.js

Alternatively:

    make shell      # attach a shell to the container
    python3 readout.py /data/playground/original/demo/example-program/main.js
    exit            # exit the container

The container mounts the artifact directory `../data` to `/data` within the
container filesystem.

`run.sh` _must_ be executed from within this directory.

## DeepTyper interface

DeepTyper takes a _single JavaScript file_ as a _command-line argument_, and
outputs a CSV file in the same directory.

The output is in the format:

    token,token type,type1,prob1,type2,prob2,type3,prob3,type4,prob4,type5,prob5

The type predictions may be omitted for non-identifier tokens.

The output uses the ASCII control character US (unit separator), which is
typically rendered as `^_`.
