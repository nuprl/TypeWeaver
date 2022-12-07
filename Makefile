SHELL     := /bin/bash

DOCKER    := podman

build:
	$(MAKE) build -C DeepTyper
	$(MAKE) build -C LambdaNet
	$(MAKE) build -C InCoder
	$(MAKE) build -C weaver

.PHONY: build shell
