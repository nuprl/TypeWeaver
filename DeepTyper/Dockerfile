FROM nvidia/cuda:11.0.3-base-ubuntu16.04

# set utf-8 encoding
ENV LANG C.UTF-8

# set up dependencies
RUN apt-get update -yq && apt-get install -yq \
        build-essential \
        openmpi-bin \
        python3 \
        python3-numpy \
        python3-pip \
        python3-pygments \
        python3-scipy \
 && pip3 install cntk-gpu \
 && rm -rf /var/lib/apt/lists/*

COPY src/pretrained /code
WORKDIR /code
ENTRYPOINT ["python3", "readout.py"]
