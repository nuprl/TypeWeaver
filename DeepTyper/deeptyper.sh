#!/bin/bash

DOCKER=podman

$DOCKER run --rm \
    --security-opt=label=disable \
    --hooks-dir=/usr/share/containers/oci/hooks.d/ \
    --volume $(pwd)/examples:/data:rw \
    typeweaver-deeptyper "$@"
