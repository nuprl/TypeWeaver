SHELL     := /bin/bash

DOCKER    := podman
NPROC     := $(shell nproc)

# Build the docker images
build:
	$(MAKE) build -C DeepTyper
	$(MAKE) build -C LambdaNet
ifndef NOGPU
	$(MAKE) build -C InCoder
endif
	$(MAKE) build -C src/weaver

# Run the full evaluation
full:
	@echo "### Type annotation prediction"
	@for s in DeepTyper LambdaNet ; do \
		for d in $$(ls data/original); do \
			python3 src/migrate_dataset/main.py \
				--directory data \
				--dataset $$d \
				--engine $$s \
				--infer ; \
		done ; \
	done
ifndef NOGPU
	for d in $$(ls data/original); do \
		python3 src/migrate_dataset/main.py \
			--directory data \
			--dataset $$d \
			--engine InCoder \
			--infer ; \
	done
endif
	@echo
	@echo "### Type weaving"
	@for s in DeepTyper LambdaNet ; do \
		for d in $$(ls data/original); do \
			python3 src/migrate_dataset/main.py \
				--workers $(NPROC) \
				--directory data \
				--dataset $$d \
				--engine $$s \
				--weave baseline ; \
		done ; \
	done
	@echo
	@echo "### Type checking"
	@for s in DeepTyper LambdaNet InCoder ; do \
		for d in $$(ls data/original); do \
			python3 src/migrate_dataset/main.py \
				--workers $(NPROC) \
				--directory data \
				--dataset $$d \
				--engine $$s \
				--emit-declaration \
				--typecheck baseline ; \
		done ; \
	done
	@echo
	@echo "### Generating CSVs"
	@python3 src/summarize_results.py \
		--data data \
		--workers $(NPROC)

.PHONY: build full
