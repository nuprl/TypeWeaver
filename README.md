# TypeWeaver

This is the code for the submitted ECOOP 2023 paper:
_Do Machine Learning Models Produce TypeScript Types that Type Check?_

## Dependencies

- Hardware: a GPU with at least 14 GB of VRAM
    - It is possible to skip the experiments that require a GPU
- Software:
    - Linux
    - Python +3.6 and the `tqdm` package (`pip install tqdm`)
    - Optional, for dataset construction:
        - Node +16
        - git
        - cloc
        - cjs-to-es6 (`npm install cjs-to-es6`)
    - [Podman](https://podman.io/) with the [NVIDIA container toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#podman)
        - All other dependencies are managed with OCI images
        - Docker may be used instead of Podman, but has not been tested
        - It is possible to run without containers, but not recommended, as
          setting up the dependencies is very difficult

## Makefile Targets

The Makefile has the following targets:

- `build`: build the project

- `all`: run everything

- `predict-all`: run type prediction for all systems

- `weave-all`: run type weaving for all systems

- `typecheck-all`: run type checking for all systems

- `predict`, `weave`, `typecheck`: run type prediction, type weaving, or type
  checking, for the system specified by the `ENGINE` variable

- `csv`: generate summary CSVs

## Makefile Variables

### No containers

By default, containers are built and used to invoke the models. If dependencies
are satisfied, it is possible to run without containers:

    make NOCONTAINERS=true build
    make NOCONTAINERS=true all

### No GPU

Setting this variable will skip the InCoder experiments, which require a GPU:

    make NOGPU=true all

### Engine

When running `make predict`, `make weave`, or `make typecheck`, the `ENGINE`
variable must be provided, e.g.:

    make ENGINE=DeepTyper predict

This will run type prediction for DeepTyper and no other system.

`ENGINE` must be one of: `DeepTyper`, `LambdaNet`, or `InCoder`.

### Number of processors

By default, `make all` will use all available processors on the machine.
This can be configured:

    make NPROC=8 all

The other targets only use a single processor.

### Docker

By default, we use Podman. To use Docker (or another container implementation),
set the `DOCKER` variable:

    make DOCKER=docker build
    make DOCKER=docker shell
    DOCKER=docker ./run.sh
