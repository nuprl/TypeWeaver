#!/bin/bash

# use podman by default
# override by calling script with `DOCKER=docker ./run.sh`
: ${DOCKER:=podman}

$DOCKER run --rm \
    --volume $(pwd)/../data:/data:rw \
    typeweaver-deeptyper:ecoop2023-artifact "$@"
