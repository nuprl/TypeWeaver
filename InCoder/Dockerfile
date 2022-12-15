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
RUN python3 cache_model.py

ENTRYPOINT ["python3", "main.py"]
