from huggingface_hub import hf_hub_download as hf
import transformers

files = ['config.json', 'pytorch_model.bin', 'special_tokens_map.json', 'tokenizer.json', 'tokenizer_config.json']

for f in files:
    hf(repo_id='facebook/incoder-6B', filename=f, revision='float16')

transformers.utils.move_cache()
