SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
ifndef NOCONTAINERS
	$(DOCKER) build -t typeweaver-deeptyper .
endif

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--volume $(PWD)/../data:/data:rw \
		--entrypoint /bin/bash \
		typeweaver-deeptyper

.PHONY: build shell
