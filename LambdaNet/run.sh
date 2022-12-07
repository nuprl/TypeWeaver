#!/bin/bash

# use podman by default
# override by calling script with `DOCKER=docker ./run.sh`
: ${DOCKER:=podman}

# need --interactive because LambdaNet reads from stdin
$DOCKER run --interactive --rm \
    --volume $(pwd)/examples:/data:rw \
    typeweaver-lambdanet
