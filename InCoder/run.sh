#!/bin/bash

DOCKER=podman

# need --security-opt and --hooks to enable GPU access
$DOCKER run --rm \
    --security-opt=label=disable \
    --hooks-dir=/usr/share/containers/oci/hooks.d/ \
    --volume $(pwd)/examples:/data:rw \
    typeweaver-incoder "$@"
