SHELL     := /bin/bash

DOCKER    := podman
NPROC     := $(shell nproc)

# Build the docker images
build:
	$(MAKE) build -C DeepTyper
	$(MAKE) build -C LambdaNet
	$(MAKE) build -C InCoder
	$(MAKE) build -C weaver
	$(MAKE) build -C src/R

# Test the evaluation on the micro dataset
micro:
	@echo "### Type annotation prediction"
	@for s in DeepTyper LambdaNet InCoder ; do \
		for d in $$(ls data/micro/original); do \
			python3 src/migrate_dataset/main.py \
				--directory data/micro \
				--dataset $$d \
				--engine $$s \
				--infer ; \
		done ; \
	done
	@echo
	@echo "### Type weaving"
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
	@echo
	@echo "### Type checking"
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
	@echo
	@echo "### Generating CSVs"
	@python3 src/summarize_results.py \
		--data data/micro \
		--workers 1
	@echo
	@echo "### Checking if R is set up"
	$(MAKE) test-r -C src/R > /dev/null

# Clean the micro output
clean-micro:
	rm -rf data/micro/DeepTyper-out
	rm -rf data/micro/LambdaNet-out
	rm -rf data/micro/InCoder-out
	rm -rf data/micro/csv

# Run the full evaluation
full:
	@echo "### Type annotation prediction"
	@for s in DeepTyper LambdaNet InCoder ; do \
		for d in $$(ls data/full/original); do \
			python3 src/migrate_dataset/main.py \
				--directory data/full \
				--dataset $$d \
				--engine $$s \
				--infer ; \
		done ; \
	done
	@echo
	@echo "### Type weaving"
	@for s in DeepTyper LambdaNet ; do \
		for d in $$(ls data/full/original); do \
			python3 src/migrate_dataset/main.py \
				--workers $(NPROC) \
				--directory data/full \
				--dataset $$d \
				--engine $$s \
				--weave baseline ; \
		done ; \
	done
	@echo
	@echo "### Type checking"
	@for s in DeepTyper LambdaNet InCoder ; do \
		for d in $$(ls data/full/original); do \
			python3 src/migrate_dataset/main.py \
				--workers $(NPROC) \
				--directory data/full \
				--dataset $$d \
				--engine $$s \
				--emit-declaration \
				--typecheck baseline ; \
		done ; \
	done
	@echo
	@echo "### Generating CSVs"
	@python3 src/summarize_results.py \
		--data data/full \
		--workers $(NPROC)
	@echo
	@echo "### Generating figures"
	@(cd src/R && ./run.sh /data/full)

archive:
	git archive --format=tar.gz -o $(shell basename $$PWD).tar.gz --prefix=$(shell basename $$PWD)/ main

.PHONY: build micro clean-micro full archive
