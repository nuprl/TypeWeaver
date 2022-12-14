SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-deeptyper .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--volume $(PWD)/../data:/data:rw \
		--entrypoint /bin/bash \
		typeweaver-deeptyper

.PHONY: build shell
