SHELL     := /bin/bash

DOCKER    := podman
NPROC     := $(shell nproc)

ifdef NOCONTAINERS
CONTAINERS_ARG := --no-containers
endif

build:
	$(MAKE) build -C DeepTyper
	$(MAKE) build -C LambdaNet
ifndef NOGPU
	$(MAKE) build -C InCoder
endif
	$(MAKE) build -C src/weaver

all: predict-all weave-all typecheck-all csv

predict-all:
	@echo "### Type prediction"
	@for s in DeepTyper LambdaNet ; do \
		$(MAKE) predict ENGINE=$$s ; \
	done
ifndef NOGPU
	@$(MAKE) predict ENGINE=InCoder
endif

predict:
ifndef ENGINE
	@echo "Undefined variable: ENGINE"
	@exit 1
else
	@for d in $$(ls data/original); do \
		python3 src/migrate_dataset/main.py \
			$(CONTAINERS_ARG) \
			--directory data \
			--dataset $$d \
			--engine $(ENGINE) \
			--infer ; \
	done
endif

weave-all:
	@echo "### Type weaving"
	@for s in DeepTyper LambdaNet ; do \
		$(MAKE) weave ENGINE=$$s ; \
	done

weave:
ifndef ENGINE
	@echo "Undefined variable: ENGINE"
	@exit 1
else
	@for d in $$(ls data/original); do \
		python3 src/migrate_dataset/main.py \
			$(CONTAINERS_ARG) \
			--workers $(NPROC) \
			--directory data \
			--dataset $$d \
			--engine $(ENGINE) \
			--weave baseline ; \
	done
endif

typecheck-all:
	@echo "### Type checking"
	@for s in DeepTyper LambdaNet InCoder ; do \
		$(MAKE) typecheck ENGINE=$$s ; \
	done

typecheck:
ifndef ENGINE
	@echo "Undefined variable: ENGINE"
	@exit 1
else
	@for d in $$(ls data/original); do \
		python3 src/migrate_dataset/main.py \
			$(CONTAINERS_ARG) \
			--workers $(NPROC) \
			--directory data \
			--dataset $$d \
			--engine $(ENGINE) \
			--emit-declaration \
			--typecheck baseline ; \
	done
endif

csv:
	@echo "### Generating CSVs"
	@python3 src/summarize_results.py --data data

.PHONY: build all predict-all predict weave-all weave typecheck-all typecheck csv
