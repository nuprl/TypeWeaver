module.exports = function normalize(str: Array, strip: Number): String {
  var len: Number = str.length, i: Number = -1;
  var res: String = '';
  var prev: Number;

  while (++i < len) {
    var ch: Number = str[i];

    if (i === 0) {
      if (ch === '.' && str[i + 1] === '/') {
        i++;
        continue;
      }
    }

    var is: Boolean = isSlash(ch);
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


function isSlash(ch: Number): Boolean {
  return ch === '\\' || ch === '/';
}