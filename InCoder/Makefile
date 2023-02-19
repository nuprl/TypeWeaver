SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-incoder:ecoop2023-artifact .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--security-opt=label=disable \
		--hooks-dir=/usr/share/containers/oci/hooks.d/ \
		--volume $(PWD)/../data:/data:rw \
		--entrypoint /bin/bash \
		typeweaver-incoder:ecoop2023-artifact

.PHONY: build shell
