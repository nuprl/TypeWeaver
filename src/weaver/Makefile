SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
ifdef NOCONTAINERS
	cd src && npm install
	cd src && tsc
else
	$(DOCKER) build -t typeweaver-weaver .
endif

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--entrypoint /bin/bash \
		--volume $(PWD)/../../data:/data:rw \
		typeweaver-weaver

.PHONY: build shell
