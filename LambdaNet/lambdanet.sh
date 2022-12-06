#!/bin/bash

DOCKER=podman

# LambdaNet reads from stdin
# Turn space-separated arguments into newline-separated arguments and pipe to LambdaNet
echo "$@" | tr " " "\n" | $DOCKER run --interactive --rm \
    --volume $(pwd)/examples:/data:rw \
    typeweaver-lambdanet
