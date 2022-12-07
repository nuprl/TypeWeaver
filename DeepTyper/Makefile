SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-deeptyper .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--security-opt=label=disable \
		--hooks-dir=/usr/share/containers/oci/hooks.d/ \
		--entrypoint /bin/bash \
		typeweaver-deeptyper

.PHONY: build shell
