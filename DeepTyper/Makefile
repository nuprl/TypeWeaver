SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-deeptyper:ecoop2023-artifact .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--volume $(PWD)/../data:/data:rw \
		--entrypoint /bin/bash \
		typeweaver-deeptyper:ecoop2023-artifact

.PHONY: build shell
