SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-lambdanet:ecoop2023-artifact .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--volume $(PWD)/../data:/data:rw \
		--entrypoint /bin/bash \
		typeweaver-lambdanet:ecoop2023-artifact

.PHONY: build shell
