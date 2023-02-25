import os, torch
from transformers import AutoTokenizer, AutoModelForCausalLM

# This is necessary to avoid crazy warnings when the program creates a subprocess (forks).
os.environ["TOKENIZERS_PARALLELISM"] = "false"

class Model:
    DEVICE = "cuda"
    MODEL_NAME = "noahshinn024/santacoder-ts"
    MODEL_REVISION = "main"
    FIM_PREFIX = "<fim-prefix>"
    FIM_MIDDLE = "<fim-middle>"
    FIM_SUFFIX = "<fim-suffix>"
    FIM_PAD = "<fim-pad>"
    ENDOFTEXT = "<|endoftext|>"

    def __init__(
        self,
        max_tokens: int = 50,
        temperature: float = 0.2,
        top_p: float = 0.95,
        max_context_length: int = 70
    ):
        self.max_tokens = max_tokens
        self.temperature = temperature
        self.top_p = top_p
        self.max_context_length = max_context_length

        self.model = AutoModelForCausalLM.from_pretrained(
            self.MODEL_NAME,
            revision=self.MODEL_REVISION,
            trust_remote_code=True
        ).to(self.DEVICE)

        self.tokenizer = AutoTokenizer.from_pretrained(
            self.MODEL_NAME, padding_side="left")

        # Note that the special tokens must be listed in the order below.
        self.tokenizer.add_special_tokens({
            "additional_special_tokens": [
                self.ENDOFTEXT,
                self.FIM_PREFIX,
                self.FIM_MIDDLE,
                self.FIM_SUFFIX,
                self.FIM_PAD
            ],
            "pad_token": self.ENDOFTEXT,
        })

    def _extract_fim_part(self, s: str) -> str:
        """
        Find the index of <fim-middle>
        """
        start = s.find(self.FIM_MIDDLE) + len(self.FIM_MIDDLE)
        stop = s.find(self.ENDOFTEXT, start) or len(s)
        return s[start:stop]

    def infill(self, prefix_suffix_tuples):
        output_list = True
        if type(prefix_suffix_tuples) == tuple:
            prefix_suffix_tuples = [prefix_suffix_tuples]
            output_list = False
        prompts = [f"{self.FIM_PREFIX}{p}{self.FIM_SUFFIX}{s}{self.FIM_MIDDLE}"
                for p, s in prefix_suffix_tuples]

        # `return_token_type_ids=False` is essential, or we get nonsense output.
        inputs = self.tokenizer(
            prompts,
            return_tensors="pt",
            padding=True,
            return_token_type_ids=False
        ).to(self.DEVICE)
        max_length = inputs.input_ids[0].size(0) + self.max_tokens

        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                do_sample=True,
                top_p=self.top_p,
                temperature=self.temperature,
                max_length=max_length,
                pad_token_id=self.tokenizer.pad_token_id
            )
        # WARNING: cannot use skip_special_tokens, because it blows away the
        # FIM special tokens.
        result = [
            self._extract_fim_part(
                self.tokenizer.decode(tensor, skip_special_tokens=False))
            for tensor in outputs
        ]
        return result if output_list else result[0]
