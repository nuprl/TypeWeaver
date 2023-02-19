SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-weaver:ecoop2023-artifact .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--entrypoint /bin/bash \
		--volume $(PWD)/../../data:/data:rw \
		typeweaver-weaver:ecoop2023-artifact

.PHONY: build shell
