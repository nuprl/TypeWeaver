SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-lambdanet .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--volume $(PWD)/../data:/data:rw \
		--entrypoint /bin/bash \
		typeweaver-lambdanet

.PHONY: build shell
