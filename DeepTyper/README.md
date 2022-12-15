# Containerized DeepTyper

To build:

    make build

To run DeepTyper:

    ./run.sh /data/path/to/file.js

Alternatively:

    make shell      # attach a shell to the container
    python3 readout.py /data/path/to/file.js
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

## Dependencies

We recommend using the provided Dockerfile. If this is not an option, you can
manually set up the dependencies:

* Python 3.6 with the `--enable-shared` flag set during installation
    * Newer versions of Python will _not_ work
    * The following Python packages: `cntk`, `numpy`, `pygments`, `scipy`
* Open MPI 1.10.3, [installed from source](https://docs.microsoft.com/en-us/cognitive-toolkit/setup-cntk-on-linux#open-mpi)
    * If `libcudart` is too new, then Open MPI needs to be patched by editing
      `ompi/contrib/vt/vt/vtlib/vt_cudart.c` and changing the struct member
      `memoryType` to `type` on lines 1878, 1879, 1885.
