SHELL     := /bin/bash

DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-r-script:ecoop2023-artifact .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--entrypoint /bin/bash \
		--volume $(PWD)/../../data:/data:rw \
		typeweaver-r-script:ecoop2023-artifact

test-r:
	$(DOCKER) run --rm \
		--entrypoint R \
		typeweaver-r-script:ecoop2023-artifact \
		-s -e "suppressMessages(library(tidyverse)); suppressMessages(library(extrafont))"

.PHONY: build shell test-r
