SHELL     := /bin/bash

DOCKER    := podman
NPROC     := $(shell nproc)

# Build the docker images
build:
	$(MAKE) build -C DeepTyper
	$(MAKE) build -C LambdaNet
	$(MAKE) build -C InCoder
	$(MAKE) build -C src/weaver
	$(MAKE) build -C src/R

# Test the evaluation on the micro dataset
micro:
	@echo "Checking scripts and containers work"
	(cd src/weaver && ./cloc --version && ./tsc --version && ./run.sh --version) > /dev/null
ifdef NOGPU
	@echo "### Copy the micro GPU results"
	mkdir -p data/micro/InCoder-out/top1k-typed-nodeps-es6/baseline
	cp -R data/results/InCoder-out/top1k-typed-nodeps-es6/baseline/decamelize \
		data/micro/InCoder-out/top1k-typed-nodeps-es6/baseline
	@echo
	@echo "### Type annotation prediction"
	@for s in DeepTyper LambdaNet ; do \
		python3 src/migrate_dataset/main.py \
			--directory data/micro \
			--dataset top1k-typed-nodeps-es6 \
			--engine $$s \
			--infer ; \
	done
else
	@echo "### Type annotation prediction"
	@for s in DeepTyper LambdaNet InCoder ; do \
		python3 src/migrate_dataset/main.py \
			--directory data/micro \
			--dataset top1k-typed-nodeps-es6 \
			--engine $$s \
			--infer ; \
	done
endif
	@echo
	@echo "### Type weaving"
	@for s in DeepTyper LambdaNet ; do \
		python3 src/migrate_dataset/main.py \
			--workers 1 \
			--directory data/micro \
			--dataset top1k-typed-nodeps-es6 \
			--engine $$s \
			--weave baseline ; \
	done
	@echo
	@echo "### Type checking"
	@for s in DeepTyper LambdaNet InCoder ; do \
		python3 src/migrate_dataset/main.py \
			--workers 1 \
			--directory data/micro \
			--dataset top1k-typed-nodeps-es6 \
			--engine $$s \
			--emit-declaration \
			--typecheck baseline ; \
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

# Playground for trying your own JavaScript projects
# Does not do type checking, CSV summarization, or figures
playground-es6:
	@echo "### CommonJS to ECMAScript 6 module conversion"
	@python3 src/convert_dataset_to_esm.py \
		--directory data/playground \
		--dataset demo

playground:
ifdef NOGPU
	@echo "### Type annotation prediction"
	@for s in DeepTyper LambdaNet ; do \
		python3 src/migrate_dataset/main.py \
			--directory data/playground \
			--dataset demo \
			--engine $$s \
			--infer ; \
	done
else
	@echo "### Type annotation prediction"
	@for s in DeepTyper LambdaNet InCoder ; do \
		python3 src/migrate_dataset/main.py \
			--directory data/playground \
			--dataset demo \
			--engine $$s \
			--infer ; \
	done
endif
	@echo
	@echo "### Type weaving"
	@for s in DeepTyper LambdaNet ; do \
		python3 src/migrate_dataset/main.py \
			--workers 1 \
			--directory data/playground \
			--dataset demo \
			--engine $$s \
			--weave baseline ; \
	done
	@echo "InCoder does not need type weaving"

# Clean the playground
clean-playground:
	rm -rf data/playground/original/demo/example-program/*.{csv,ts,warn,err,out}
	rm -rf data/playground/original/demo/example-program-es6
	rm -rf data/playground/DeepTyper-out
	rm -rf data/playground/LambdaNet-out
	rm -rf data/playground/InCoder-out

# Run the full evaluation
full:
ifdef NOGPU
	@echo "### Copy the GPU results"
	for d in $$(ls data/full/original); do \
		mkdir -p data/full/InCoder-out/$$d/baseline ; \
		cp -R data/results/InCoder-out/$$d/baseline/* data/full/InCoder-out/$$d/baseline ; \
	done
	@echo
	@echo "### Type annotation prediction"
	@for s in DeepTyper LambdaNet ; do \
		for d in $$(ls data/full/original); do \
			python3 src/migrate_dataset/main.py \
				--directory data/full \
				--dataset $$d \
				--engine $$s \
				--infer ; \
		done ; \
	done
else
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
endif
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

# Clean the full output
clean-full:
	rm -rf data/full/DeepTyper-out
	rm -rf data/full/LambdaNet-out
	rm -rf data/full/InCoder-out
	rm -rf data/full/csv
	rm -rf data/full/figures

# Copy partial results over: results after predicting type annotations
# This will delete all existing results!
partial-predictions: clean-full
	for s in DeepTyper LambdaNet ; do \
		for d in $$(ls data/full/original); do \
			mkdir -p data/full/$$s-out/$$d/predictions ; \
			cp -R data/results/$$s-out/$$d/predictions/* data/full/$$s-out/$$d/predictions ; \
		done ; \
	done
	for d in $$(ls data/full/original); do \
		mkdir -p data/full/InCoder-out/$$d/baseline ; \
		cp -R data/results/InCoder-out/$$d/baseline/* data/full/InCoder-out/$$d/baseline ; \
	done

# Copy partial results over: results after type weaving
# This will delete all existing results!
partial-weaving: partial-predictions
	for s in DeepTyper LambdaNet ; do \
		for d in $$(ls data/full/original); do \
			mkdir -p data/full/$$s-out/$$d/baseline ; \
			cp -R data/results/$$s-out/$$d/baseline/* data/full/$$s-out/$$d/baseline ; \
		done ; \
	done

# Copy partial results over: results after type checking
# This will delete all existing results!
partial-checking: partial-weaving
	for s in DeepTyper LambdaNet InCoder ; do \
		for d in $$(ls data/full/original); do \
			mkdir -p data/full/$$s-out/$$d/baseline-checked ; \
			cp -R data/results/$$s-out/$$d/baseline-checked/* data/full/$$s-out/$$d/baseline-checked ; \
			mkdir -p data/full/$$s-out/$$d/baseline-typedefs ; \
			cp -R data/results/$$s-out/$$d/baseline-typedefs/* data/full/$$s-out/$$d/baseline-typedefs ; \
		done ; \
	done

# Make only the figures, copy only the summary CSVs
figures:
	cp -R data/results/csv data/full
	(cd src/R && ./run.sh /data/full)

archive:
	git archive --format=tar.gz -o $(shell basename $$PWD).tar.gz --prefix=$(shell basename $$PWD)/ ecoop2023-artifact
	sha1sum $(shell basename $$PWD).tar.gz
	md5sum $(shell basename $$PWD).tar.gz

.PHONY: build micro clean-micro full clean-full playground playground-es6 clean-playground
.PHONY: partial-predictions partial-weaving partial-checking
.PHONY: figures archive
