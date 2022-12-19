from huggingface_hub import hf_hub_download as hf
from transformers import utils as tf

files = ['config.json', 'pytorch_model.bin', 'special_tokens_map.json', 'tokenizer.json', 'tokenizer_config.json']

for f in files:
    hf(repo_id='facebook/incoder-6B', filename=f, revision='float16')

if hasattr(tf, 'move_cache'):
    tf.move_cache()
