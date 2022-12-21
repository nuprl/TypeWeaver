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
	@for m in DeepTyper LambdaNet ; do \
		$(MAKE) predict MODEL=$$m ; \
	done
ifndef NOGPU
	@$(MAKE) predict MODEL=InCoder
endif

predict:
ifndef MODEL
	@echo "Undefined variable: MODEL"
	@exit 1
else
	@for d in $$(ls data/original); do \
		python3 src/migrate_dataset/main.py \
			$(CONTAINERS_ARG) \
			--directory data \
			--dataset $$d \
			--model $(MODEL) \
			--predict ; \
	done
endif

weave-all:
	@echo "### Type weaving"
	@for m in DeepTyper LambdaNet ; do \
		$(MAKE) weave MODEL=$$m ; \
	done

weave:
ifndef MODEL
	@echo "Undefined variable: MODEL"
	@exit 1
else
	@for d in $$(ls data/original); do \
		python3 src/migrate_dataset/main.py \
			$(CONTAINERS_ARG) \
			--workers $(NPROC) \
			--directory data \
			--dataset $$d \
			--model $(MODEL) \
			--weave baseline ; \
	done
endif

typecheck-all:
	@echo "### Type checking"
	@for m in DeepTyper LambdaNet InCoder ; do \
		$(MAKE) typecheck MODEL=$$m ; \
	done

typecheck:
ifndef MODEL
	@echo "Undefined variable: MODEL"
	@exit 1
else
	@for d in $$(ls data/original); do \
		python3 src/migrate_dataset/main.py \
			$(CONTAINERS_ARG) \
			--workers $(NPROC) \
			--directory data \
			--dataset $$d \
			--model $(MODEL) \
			--emit-declaration \
			--typecheck baseline ; \
	done
endif

csv:
	@echo "### Generating CSVs"
	@python3 src/summarize_results.py --data data

.PHONY: build all predict-all predict weave-all weave typecheck-all typecheck csv
