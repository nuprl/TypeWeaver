module.exports = function normalize(str: string, strip: string): any {
  var len: number = str.length, i = -1;
  var res: string = '';
  var prev: any;

  while (++i < len) {
    var ch: string = str[i];

    if (i === 0) {
      if (ch === '.' && str[i + 1] === '/') {
        i++;
        continue;
      }
    }

    var is = isSlash(ch);
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


function isSlash(ch: string): boolean {
  return ch === '\\' || ch === '/';
}