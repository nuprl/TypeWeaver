FROM nvidia/cuda:11.8.0-base-ubuntu22.04

# set up dependencies
RUN apt-get update -yq && apt-get install -yq \
        build-essential \
        cargo \
        curl \
        python3 \
        python3-pip \
        rustc \
 && pip3 install \
        accelerate \
        huggingface_hub \
        torch \
        transformers \
 && rm -rf /var/lib/apt/lists/*

# copy rust code and compile rust
WORKDIR /code/rs
COPY src/rs .
RUN cargo build

# copy python code and download model
WORKDIR /code/py
COPY src/py .
RUN python3 -c "from huggingface_hub import hf_hub_download as hf; \
                import transformers; \
                hf(repo_id='facebook/incoder-6B', filename='config.json', revision='float16'); \
                hf(repo_id='facebook/incoder-6B', filename='pytorch_model.bin', revision='float16'); \
                hf(repo_id='facebook/incoder-6B', filename='special_tokens_map.json', revision='float16'); \
                hf(repo_id='facebook/incoder-6B', filename='tokenizer.json', revision='float16'); \
                hf(repo_id='facebook/incoder-6B', filename='tokenizer_config.json', revision='float16'); \
                transformers.utils.move_cache()"

ENTRYPOINT ["python3", "main.py"]
