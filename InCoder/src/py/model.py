# This file takes a while to load

# This is necessary to avoid crazy warnings when main.py creates a subprocess (forks).
import os

os.environ["TOKENIZERS_PARALLELISM"] = "false"

import torch
from transformers import AutoTokenizer, AutoModelForCausalLM


def init_model(model_name: str):
    """
    Returns a dictionary with a model and tokenizer.
    """

    assert model_name in ["facebook/incoder-1B", "facebook/incoder-6B"]
    if model_name == "facebook/incoder-6B":
        kwargs = dict(
            revision="float16",
            torch_dtype=torch.float16,
            low_cpu_mem_usage=True,
        )
    else:
        kwargs = dict()
    return {
        "model": AutoModelForCausalLM.from_pretrained(model_name, **kwargs)
        .half()
        .to(0),
        "tokenizer": AutoTokenizer.from_pretrained(model_name),
    }
