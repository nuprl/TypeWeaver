SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
ifdef NOCONTAINERS
	cd src/scripts/ts && npm install
	cd src/scripts/ts && tsc
	cd src && sbt "runMain lambdanet.JavaAPI"
else
	$(DOCKER) build -t typeweaver-lambdanet .
endif

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--volume $(PWD)/../data:/data:rw \
		--entrypoint /bin/bash \
		typeweaver-lambdanet

.PHONY: build shell
