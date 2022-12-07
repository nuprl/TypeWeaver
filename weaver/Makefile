SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-weaver .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--entrypoint /bin/bash \
		typeweaver-weaver

.PHONY: build shell
