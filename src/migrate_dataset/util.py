from enum import Enum
from pathlib import Path

src_root = Path(Path(__file__).parent, "..").resolve()

def containerized_path(path, directory):
    return Path("/data", path.relative_to(directory))

class ResultStatus(Enum):
    OK = 0
    FAIL = 1
    SKIP = 2

class Result:
    def __init__(self, name, status):
        self.name = name
        self.status = status

    def is_ok(self):
        return self.status is ResultStatus.OK

    def is_fail(self):
        return self.status is ResultStatus.FAIL

    def is_skip(self):
        return self.status is ResultStatus.SKIP

    def message(self):
        if self.is_ok():
            return "[ OK ]"
        elif self.is_fail():
            return "[FAIL]"
        elif self.is_skip():
            return "[SKIP]"

def send_data_to(proc, data):
    proc.communicate(data)
