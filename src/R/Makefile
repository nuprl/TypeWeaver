SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-r-script .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--entrypoint /bin/bash \
		--volume $(PWD)/../../data:/data:rw \
		typeweaver-r-script

.PHONY: build shell
