from enum import Enum
from pathlib import Path

tools_root = Path(Path(__file__).parent, "..").resolve()

ANSI_RED = "\033[0;31m"
ANSI_GREEN = "\033[0;32m"
ANSI_YELLOW = "\033[0;33m"
ANSI_RESET = "\033[0m"

class ResultStatus(Enum):
    OK = 0
    FAIL = 1
    SKIP = 2

class Result:
    def __init__(self, name, status, string):
        self.name = name
        self.status = status
        self.string = string
