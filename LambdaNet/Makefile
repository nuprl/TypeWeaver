SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-lambdanet .

build-nocontainers:
	cd src/scripts/ts && npm install
	cd src/scripts/ts && tsc
	cd src && sbt "runMain lambdanet.JavaAPI"

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--volume $(PWD)/../data:/data:rw \
		--entrypoint /bin/bash \
		typeweaver-lambdanet

.PHONY: build build-nocontainers shell
