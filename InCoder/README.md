# InCoder

The notebook `py/playground.ipynb` shows an example of loading the model and
running inference. Note that `importlib` is used to reload the `TypeInference`
class, and is not needed when running type inference from a script.

The script `py/main.py` can also be run as a standalone script:

    cd py
    python main.py --files example.js

This will run inference on `example.js`, and write the result to `example.ts`.

To minimize the startup overhead, multiple files or directories can be passed:

    cd py
    python main.py --files a.js b.js
    python main.py --directories dir1
    python main.py --directories dir1 dir2

In each case, the model will be loaded only once per invocation.

## Dependencies

* Rust 1.64.0
* Python
* The following Python packages: `torch`, `tqdm`, `transformers`

## Setup

After installing dependencies, compile the Rust code:

    cd rs
    cargo build

## Downloading the model

The 1B model is 2.44 GB and needs to be downloaded for the first time. To warm
the cache, you can run:

    cd py
    python -c "import model; m = model.init_model('facebook/incoder-1B')"
