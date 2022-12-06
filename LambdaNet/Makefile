DOCKER    := podman

build: Dockerfile
	$(DOCKER) build -t typeweaver-lambdanet .

shell: build
	$(DOCKER) run --interactive --tty --rm \
		--entrypoint /bin/bash \
		typeweaver-lambdanet

.PHONY: build shell
