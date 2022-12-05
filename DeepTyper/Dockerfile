FROM nvidia/cuda:11.0.3-base-ubuntu16.04
RUN apt-get update -yq && apt-get install -yq \
    build-essential \
    openmpi-bin \
    python3 \
    python3-numpy \
    python3-pip \
    python3-pygments \
    python3-scipy \
 && rm -rf /var/lib/apt/lists/*
RUN pip3 install cntk-gpu
