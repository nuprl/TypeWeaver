from datasets import load_dataset
import re

# features: content, avg_line_length, max_line_length, alphanum_fraction,
# licenses, repository_name, path, size, lang
dataset = load_dataset("bigcode/the-stack-smol",
                       data_dir="data/typescript",
                       split="train")

# class and interface definitions
# (negative match: new) class|interface <identifier> (whitespace, {, extends, end of string)
CLASS_INTERFACE_RE = re.compile("^.*((?<!new )class|interface)\s+([a-zA-Z_$][\w_$<]*>?)(\s+|extends|)(.*){$")

# type aliases
# type <identifier> =
TYPE_RE = re.compile("^.*(type)\s+([a-zA-Z_$][\w_$<>]*)(\s*=)")

# type annotations
# Note: this matches a lot of false positives, e.g. maps and comments
# (<identifier>\??|\)): (readonly)? <identifier>
ANNOTATION_RE = re.compile("(?:[a-zA-Z_$][\w_$]*\??|\)):\s*(?:readonly)?\s*([a-zA-Z_$][\w_$]*(?:\[\])?)")

print('"Repository","Path","Type definitions","Interesting annotations","Type annotations"')

for d in dataset:
    print(f'"{d["repository_name"]}","{d["path"]}",', end="")
    defns, uses, interesting = 0, 0, 0
    lines = d["content"].split("\n")
    for l in lines:
        matches = CLASS_INTERFACE_RE.match(l)
        if matches:
            defns += 1
        matches = TYPE_RE.match(l)
        if matches:
            defns += 1

        matches = ANNOTATION_RE.findall(l)
        if matches:
            for m in matches:
                uses += 1
                if m == "string" or m == "number" or m == "boolean" or m == "any":
                    break
                if m == "null" or m == "void" or m == "unknown":
                    break
                if m == "string[]" or m == "number[]" or m == "boolean[]" or m == "any[]":
                    break
                interesting += 1

    print(f"{defns},{interesting},{uses}")
