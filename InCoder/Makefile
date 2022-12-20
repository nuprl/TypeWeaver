SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
ifdef NOCONTAINERS
	cd src/rs && cargo build
	cd src/py && python3 cache_model.py
else
	$(DOCKER) build -t typeweaver-incoder .
endif

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--security-opt=label=disable \
		--hooks-dir=/usr/share/containers/oci/hooks.d/ \
		--volume $(PWD)/../data:/data:rw \
		--entrypoint /bin/bash \
		typeweaver-incoder

.PHONY: build shell
