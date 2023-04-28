from pathlib import Path
from text_generation import Client

class Model:
    FIM_PREFIX = "<fim_prefix>"
    FIM_MIDDLE = "<fim_middle>"
    FIM_SUFFIX = "<fim_suffix>"
    FIM_PAD = "<fim_pad>"
    ENDOFTEXT = "<|endoftext|>"
    ENDPOINT_FILE = ".BIGCODE15B_ENDPOINT"

    def __init__(
        self,
        max_tokens: int = 50,
        temperature: float = 0.2,
        top_p: float = 0.95,
        max_context_length: int = 400
    ):
        self.max_tokens = max_tokens
        self.temperature = temperature
        self.top_p = top_p
        self.max_context_length = max_context_length

        if not Path(self.ENDPOINT_FILE).exists():
            print("Unknown API endpoint; make sure .BIGCODE15B_ENDPOINT exists and contains the endpoint URL.")
            exit(2)
        endpoint = Path(self.ENDPOINT_FILE).read_text().strip()
        self.client = Client(endpoint)

    def _extract_fim_part(self, s: str) -> str:
        """
        Find the index of <fim-middle>
        """
        stop = s.find(self.ENDOFTEXT) or len(s)
        return s[:stop]

    def infill(self, prefix, suffix):
        prompt = f"{self.FIM_PREFIX}{prefix}{self.FIM_SUFFIX}{suffix}{self.FIM_MIDDLE}"

        output = self.client.generate(prompt,
                                      do_sample=True,
                                      max_new_tokens=self.max_tokens,
                                      temperature=self.temperature,
                                      top_p=self.top_p
                                      ).generated_text

        return self._extract_fim_part(output)
