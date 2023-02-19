#!/bin/bash

# use podman by default
# override by calling script with `DOCKER=docker ./run.sh`
: ${DOCKER:=podman}

# need --interactive because LambdaNet reads from stdin
$DOCKER run --interactive --rm \
    --volume $(pwd)/../data:/data:rw \
    --entrypoint sbt \
    typeweaver-lambdanet:ecoop2023-artifact \
    "runMain lambdanet.TypeInferenceService $@"
