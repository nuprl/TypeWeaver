from pathlib import Path
import argparse
import typing as t
import re
import subprocess
import sys
import traceback

BOS = "<|endoftext|>"
EOM = "<|endofmask|>"

# NOTE(arjun): Does this have to be hard-coded?
MODEL_MAX_OUTPUT_LENGTH = 2048

VALIDATE_TYPE_EXEC = "../rs/target/debug/ts_infer_incoder"

_END_OF_MASK_OR_NEWLINE_RE = re.compile(r"<\|endofmask\|>|<\|endoftext\|>|\n", re.M)

# Regular expression that finds a function declaration in JS
# "function NAME(" or "function("
_FUNC_START_REGEX = re.compile(r"function(\s+([a-zA-Z_$][a-zA-Z_$0-9]*))?\s*\(")


def _extract_maybe_type(text: str) -> str:
    """
    Extracts the text before the end-of-mask, end-of-test, or newline tokens.
    Note that the result may be the empty string.
    """
    return _END_OF_MASK_OR_NEWLINE_RE.split(text, maxsplit=1)[0].strip()


def _templatize_function(line: str):
    """
    If the line contains function(x, y, z) then turn it into function(x ??, y ??, z ??)

    TODO(arjun): Support return type annotation
    """
    # Find the first occurrence of "function("
    function_start = _FUNC_START_REGEX.search(line)
    if function_start is None:
        return line
    function_start = function_start.end()
    # Find the first occurrence of ")"
    function_end = line.index(")", function_start)
    if function_end == function_start:
        return line
    arg_list = line[function_start:function_end].split(",")
    arg_list = "???, ".join(arg_list)
    return line[:function_start] + arg_list + "???" + line[function_end:]

def _prefix_ending_with_newline(str, max_length):
    """
    Produces a prefix of str is at most max_length, but does not split a line.
    """
    return str[:max_length].rsplit("\n", 1)[0]

def _suffix_starting_with_newline(str, max_length):
    """
    Produces a suffix of str is at most max_length, but does not split a line.
    """
    return str[-max_length:].split("\n", 1)[0]


def _clip_text(str1, str2, max_length):
    """
    Clips the two strings so that the total length is at most max_length.
    Keeps the first string intact, and clips the second string if possible
    """

    # Find the last occurrence of "function" in str1
    enclosing_function_start = str1.rfind("function")
    str1 = str1[enclosing_function_start:]

    if len(str1) < max_length:
        str2 = _prefix_ending_with_newline(str2, max_length - len(str1))
    elif len(str2) < max_length:
        # Negative, so we get the suffix
        str1 = _suffix_starting_with_newline(str1, max_length - len(str2))
    else:
        # Both exceed the max_length
        str1 = _suffix_starting_with_newline(str1, max_length // 2)
        str2 = _prefix_ending_with_newline(str2, max_length // 2)
    return str1, str2


class TypeInference:
    def __init__(self, model, tokenizer, temperature: float = 0.0, type_length_limit: int = 5, max_context_length: int = 70):
        self.model = model
        self.tokenizer = tokenizer
        self.temperature = temperature
        self.type_length_limit = type_length_limit
        self.max_context_length = max_context_length
        self.do_sample = False if temperature == 0 else True
        self.type_log = []

    def _generate(
        self, prompt: str
    ) -> t.Tuple[str, bool]:
        """
        A canonical function to generate text from a prompt. The length_limit
        limits the maximum length of the generated text (beyond the prompt).
        """
        input_ids = self.tokenizer(prompt, return_tensors="pt").input_ids.to(
            self.model.device
        )
        current_length = input_ids.flatten().size(0)
        max_length = self.type_length_limit + current_length

        if max_length == current_length:
            return prompt, True
        if max_length > MODEL_MAX_OUTPUT_LENGTH:
            max_length = MODEL_MAX_OUTPUT_LENGTH
            truncated = True
        else:
            truncated = False

        output = self.model.generate(
            input_ids=input_ids,
            do_sample=self.do_sample,
            top_p=0.95, # NOTE(arjun): Any point in this?
            temperature=self.temperature,
            max_length=max_length,
        )
        detok_hypo_str = self.tokenizer.decode(output.flatten())
        if detok_hypo_str.startswith(BOS):
            detok_hypo_str = detok_hypo_str[len(BOS) :]
        return detok_hypo_str, truncated

    def _generate_valid_type(
        self, prompt: str, retries: int
    ):
        """
        Given an InCoder-style prompt for infilling, tries to fill <|mask:0|> with a valid
        TypeScript type. To determine that it is valid, we use an external program. If we fail
        to generate a valid type after retries attempts, we return any.
        """
        filled_type = "any"
        for _ in range(retries):
            generated, is_truncated = self._generate(prompt)
            if is_truncated:
                print("WARNING: Truncated output")
            filled_type = _extract_maybe_type(generated[len(prompt) :])
            if filled_type == "":
                filled_type = "any"
                continue
            # Run
            validate_process = subprocess.run(
                [VALIDATE_TYPE_EXEC],
                input=filled_type,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                encoding="utf-8",
                check=False,
            )
            if validate_process.returncode != 0:
                filled_type = "any"
                continue
            filled_type = validate_process.stdout.strip()
            break
        return filled_type

    def _infill(
        self, template: str, infill_marker: str
    ):
        parts = template.split(infill_marker)
        if len(parts) < 2:
            raise ValueError(
                f"Expected at least one {infill_marker} in template. Got {template}"
            )

        infilled_prefix = parts[0]
        for part_index, part in enumerate(parts[1:]):
            suffix = "".join(parts[part_index + 1 :])
            clipped_prefix, clipped_suffix = _clip_text(
                infilled_prefix, suffix, self.max_context_length
            )
            prompt = f"{clipped_prefix}: <|mask:0|>{clipped_suffix}<|mask:1|><|mask:0|>"
            filled_type = self._generate_valid_type(
                prompt, retries=3
            )
            self.type_log.append({ "prompt": prompt, "type": filled_type })
            infilled_prefix += ": " + filled_type + part
        return infilled_prefix

    def infer(self, p: Path):
        self.type_log.clear()
        lines = p.read_text().splitlines()
        lines = [_templatize_function(line) for line in lines]
        template = "\n".join(lines)
        if "???" not in template:
            return template
        return self._infill(template, infill_marker="???")

def _parse_args():
    parser = argparse.ArgumentParser(
        description="Runs InCoder to infer types for JavaScript",
        epilog="One of --files or --directories must be provided")

    parser.add_argument(
        "--files",
        nargs="+",
        help="JavaScript files to run type inference on")
    parser.add_argument(
        "--directories",
        nargs="+",
        help="JavaScript directories to run type inference on")
    parser.add_argument(
        "--write-done-file",
        action="store_true",
        help=argparse.SUPPRESS)

    args = parser.parse_args()

    if args.files and args.directories:
        parser.print_usage()
        print(f"error: one of --files or --directories must be provided, not both")
        exit(1)
    elif args.files:
        for f in args.files:
            if not Path(f).exists():
                parser.print_usage()
                print(f"error: file does not exist: {f}")
                exit(1)
    elif args.directories:
        for d in args.directories:
            if not Path(d).exists():
                parser.print_usage()
                print(f"error: directory does not exist: {d}")
                exit(1)
    else:
        parser.print_usage()
        print("error: need to provide arguments")
        exit(1)

    return args

def _infer_on_file(typeinf, input_file):
    output_file = input_file.with_suffix(".ts")
    error_file = input_file.with_suffix(".err")

    try:
        result = typeinf.infer(input_file)
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(result)
    except:
        error = traceback.format_exc()
        with open(error_file, "w", encoding="utf-8") as f:
            f.write(error)

def _infer_on_directory(typeinf, directory, write_done_file = False):
    files = sorted([f for f in directory.rglob("*.js") if f.is_file()])
    for f in files:
        _infer_on_file(typeinf, f)

    if write_done_file:
        done_file = Path(directory, "incoder.done")
        done_file.touch(exist_ok=True)

def main():
    args = _parse_args()

    import model
    m = model.init_model("facebook/incoder-6B")
    typeinf = TypeInference(**m)

    if args.files:
        for f in sorted(args.files):
            _infer_on_file(typeinf, Path(f))
    elif args.directories:
        for d in sorted(args.directories):
            _infer_on_directory(typeinf, Path(d), args.write_done_file)

if __name__ == "__main__":
    main()
