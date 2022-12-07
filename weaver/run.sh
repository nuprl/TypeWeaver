#!/bin/bash

# use podman by default
# override by calling script with `DOCKER=docker ./run.sh`
: ${DOCKER:=podman}

$DOCKER run --rm \
    --volume $(pwd)/examples:/data:rw \
    typeweaver-weaver "$@"
