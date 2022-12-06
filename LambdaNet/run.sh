#!/bin/bash

DOCKER=podman

# need --interactive because LambdaNet reads from stdin
$DOCKER run --interactive --rm \
    --volume $(pwd)/examples:/data:rw \
    typeweaver-lambdanet
