SHELL     := /bin/bash

DOCKER    := podman
NPROC     := $(shell nproc)

# Build the docker images
build:
	$(MAKE) build -C DeepTyper
	$(MAKE) build -C LambdaNet
	$(MAKE) build -C InCoder
	$(MAKE) build -C weaver

# Test the evaluation on the micro dataset
micro:
	@for s in DeepTyper LambdaNet InCoder ; do \
		for d in $$(ls data/micro/original); do \
			python3 src/migrate_dataset/main.py \
				--directory data/micro \
				--dataset $$d \
				--engine $$s \
				--infer ; \
		done ; \
	done
	@for s in DeepTyper LambdaNet ; do \
		for d in $$(ls data/micro/original); do \
			python3 src/migrate_dataset/main.py \
				--workers 1 \
				--directory data/micro \
				--dataset $$d \
				--engine $$s \
				--weave baseline ; \
		done ; \
	done
	@for s in DeepTyper LambdaNet InCoder ; do \
		for d in $$(ls data/micro/original); do \
			python3 src/migrate_dataset/main.py \
				--workers 1 \
				--directory data/micro \
				--dataset $$d \
				--engine $$s \
				--emit-declaration \
				--typecheck baseline ; \
		done ; \
	done
	@python3 src/summarize_results.py \
		--data data/micro \
		--workers 1

.PHONY: build micro
