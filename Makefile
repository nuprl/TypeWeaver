SHELL     := /bin/bash

DOCKER    := podman
NPROC     := $(shell nproc)

# Build the docker images
build:
	$(MAKE) build -C DeepTyper
	$(MAKE) build -C LambdaNet
	$(MAKE) build -C InCoder
	$(MAKE) build -C weaver

# Test the evaluation on the micro datasets
micro:
	@for s in DeepTyper LambdaNet InCoder ; do \
		for d in $$(ls datasets/micro/original); do \
			python3 src/migrate_dataset/main.py \
				--directory datasets/micro \
				--dataset $$d \
				--engine $$s \
				--infer ; \
		done ; \
	done

.PHONY: build micro
