from enum import Enum
from pathlib import Path
from tqdm import tqdm as std_tqdm
from tqdm.utils import (_unicode, disp_len)
import sys

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

class tqdm(std_tqdm):
    """
    Override tqdm.status_printer to handle non-TTY cases, i.e. redirecting
    output to a file.
    """
    @staticmethod
    def status_printer(file):
        fp = file
        fp_flush = getattr(fp, 'flush', lambda: None)  # pragma: no cover
        if fp in (sys.stderr, sys.stdout):
            getattr(sys.stderr, 'flush', lambda: None)()
            getattr(sys.stdout, 'flush', lambda: None)()

        def fp_write(s):
            fp.write(_unicode(s))
            fp_flush()

        last_len = [0]

        def print_status(s):
            len_s = disp_len(s)
            char = '\r' if hasattr(fp, "isatty") and file.isatty() else '\n'
            fp_write(char + s + (' ' * max(last_len[0] - len_s, 0)))
            last_len[0] = len_s

        return print_status
