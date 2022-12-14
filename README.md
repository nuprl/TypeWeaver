# TypeWeaver

This is the code for the submitted ECOOP 2023 paper:
_Do Machine Learning Models Produce TypeScript Types that Type Check?_

## Dependencies

- Hardware: a GPU with at least 14 GB of VRAM
    - It is possible to skip the experiments that require a GPU
- Software:
    - Linux
    - Python +3.6 and the `tqdm` package (`pip install tqdm`)
    - [Podman](https://podman.io/) with the [NVIDIA container toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#podman)
        - All other dependencies are managed with OCI images
        - Docker may be used instead of Podman, but has not been tested
        - It is possible to run without containers, but not recommended, as
          setting up the dependencies is very difficult

## Makefile Targets

The Makefile has the following targets:

- `build`: build the containers

- `full`: run the full experiments

## Makefile Variables

### No GPU

Setting this variable will skip the InCoder experiments, which require a GPU.
Instead, the InCoder results from the paper will be copied over.

    make NOGPU=true full

### Number of processors

By default, `make full` will use all available processors on the machine.
This can be configured:

    make NPROC=8 full

The other targets only use a single processor.

### Docker

By default, we use Podman. To use Docker (or another container implementation),
set the `DOCKER` variable:

    make DOCKER=docker build
    make DOCKER=docker shell
    DOCKER=docker ./run.sh
