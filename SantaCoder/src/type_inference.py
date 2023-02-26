from pathlib import Path
from subprocess import PIPE
import re, subprocess

class TypeInference:
    INFILL_MARKER = "???"
    FUNC_START_REGEX = re.compile(r"^.*function(\s+([a-zA-Z_$][\w_$]*))?\s*\(")
    VALIDATE_TYPE_EXEC = "../../InCoder/src/rs/target/debug/ts_infer_incoder"

    def __init__(self, model):
        self.model = model

    def _templatize_function(self, line: str) -> str:
        """
        If the line contains 'function(x, y, z)' then, then insert ???
        (or whatever INFILL_MARKER is) at the infill points,
        e.g. returning 'function(x???, y???, z???)'
        """
        # Find the first occurrence of "function("
        match = self.FUNC_START_REGEX.search(line)
        if match is None:
            return line
        function_start = match.end()

        # Find the first occurrence of ")"
        function_end = line.find(")", function_start)

        # Multi-line signature or no parameters
        if function_end == -1 or function_start == function_end:
            return line

        param_list = line[function_start:function_end].split(",")
        param_list = f"{self.INFILL_MARKER},".join(param_list) + self.INFILL_MARKER
        return line[:function_start] + param_list + line[function_end:]

    def _clip_text(self, str1: str, str2: str, max_length: int):
        """
        Clips the two strings so that the total length is at most max_length.
        Keeps the first string intact, and clips the second string if possible
        """
        def _prefix_ending_with_newline(str, max_length):
            """
            Produces a prefix of str that is at most max_length,
            but does not split a line.
            """
            return str[:max_length].rsplit("\n", 1)[0]

        def _suffix_starting_with_newline(str, max_length):
            """
            Produces a suffix of str that is at most max_length,
            but does not split a line.
            """
            return str[-max_length:].split("\n", 1)[0]

        # Find the last occurrence of "function" in str1
        enclosing_function_start = str1.rfind("function")
        str1 = str1[enclosing_function_start:]

        if len(str1) < max_length:
            # str1 is short enough, so clip str2
            str2 = _prefix_ending_with_newline(str2, max_length - len(str1))
        elif len(str2) < max_length:
            # str1 is too long but str2 is short enough, so clip str1
            str1 = _suffix_starting_with_newline(str1, max_length - len(str2))
        else:
            # Both exceed the max_length
            str1 = _suffix_starting_with_newline(str1, max_length // 2)
            str2 = _prefix_ending_with_newline(str2, max_length // 2)
        return str1, str2

    def _generate_valid_type(self, prefix: str, suffix: str, retries: int) -> str:
        """
        Given a prefix and suffix for infilling, try to generate a valid
        TypeScript type. To determine if it is valid, we use an external
        program, bundled with our InCoder script. We try `retries` times before
        giving up and returning `any`.
        """
        for _ in range(retries):
            generated = self.model.infill((prefix, suffix))

            # Split on whitespace and keep only the first element
            generated = generated.split()[0]
            if generated == "":
                continue

            # Call external program to validate/strip type
            args = [self.VALIDATE_TYPE_EXEC]
            result = subprocess.run(
                args, input=generated, stdout=PIPE, stderr=PIPE, encoding="utf-8"
            )
            if result.returncode != 0:
                continue

            return result.stdout.strip()
        return "any"

    def _infill_types(self, template: str) -> str:
        """
        Split the template at the infill points, and construct the prefix and
        suffix. Loop over all segments and append the results to the running
        prefix.
        """
        parts = template.split(self.INFILL_MARKER)
        if len(parts) < 2:
            raise ValueError(
                f"Expected at least one {self.INFILL_MARKER} in template, but got {template}"
            )

        infilled_prefix = parts[0]
        for part_index, part in enumerate(parts[1:]):
            infilled_prefix += ": "
            suffix = "".join(parts[part_index + 1:])

            # Clip the prefix and suffix to make sure they fit into the prompt
            clipped_prefix, clipped_suffix = self._clip_text(
                infilled_prefix, suffix, self.model.max_context_length
            )

            filled_type = self._generate_valid_type(
                clipped_prefix, clipped_suffix, retries=3
            )
            infilled_prefix += filled_type + part

        return infilled_prefix

    def infer(self, p: Path) -> str:
        """
        Given the path to a JavaScript file, infer types by infilling type
        annotations. Returns the type-annotated file as a string.
        """
        lines = p.read_text().splitlines()
        lines = [self._templatize_function(line) for line in lines]
        template = "\n".join(lines)
        if self.INFILL_MARKER not in template:
            return template
        return self._infill_types(template)
