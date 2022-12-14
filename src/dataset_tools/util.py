# Common helper functions used by multiple scripts

from pathlib import Path
import json

def check_exists(path):
    if not Path(path).exists():
        print(f"error: directory does not exist: {path}")
        exit(2)

def get_dependencies(path):
    package_json = Path(path, "package.json")

    if not package_json.exists():
        return []

    with open(package_json) as f:
        data = json.load(f)
        if "dependencies" not in data.keys():
            return []

        return list(data["dependencies"].keys())
