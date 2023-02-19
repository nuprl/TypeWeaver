SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-r-script .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--entrypoint /bin/bash \
		--volume $(PWD)/../../data:/data:rw \
		typeweaver-r-script

test-r:
	$(DOCKER) run --rm \
		--entrypoint R \
		typeweaver-r-script \
		-s -e "suppressMessages(library(tidyverse)); suppressMessages(library(extrafont))"

.PHONY: build shell test-r
