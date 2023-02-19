SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-weaver .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--entrypoint /bin/bash \
		--volume $(PWD)/../../data:/data:rw \
		typeweaver-weaver

.PHONY: build shell
