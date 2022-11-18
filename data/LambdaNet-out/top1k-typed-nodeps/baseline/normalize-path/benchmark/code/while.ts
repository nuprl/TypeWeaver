module.exports = function normalize(str: any[], strip: number): string {
  var len: number = str.length, i: number = -1;
  var res: string = '';
  var prev: number;

  while (++i < len) {
    var ch: number = str[i];

    if (i === 0) {
      if (ch === '.' && str[i + 1] === '/') {
        i++;
        continue;
      }
    }

    var is: boolean = isSlash(ch);
    if (i === len - 1 && is) {
      if (strip !== false) {
        if (prev) res = res.slice(0, res.length -1);
        continue;
      }
    }

    if (is) {
      if (prev) continue;
      res += '/';
    } else {
      res += ch;
    }

    prev = is;
  }

  return res;
};


function isSlash(ch: number): boolean {
  return ch === '\\' || ch === '/';
}