module.exports = repeat;

function repeat(str: string, num: number): string {
  if (typeof str !== 'string') {
    throw new TypeError('repeat-string expects a string.');
  }

  var len: number = str.length;
  var max: number = len * num;

  if (num === 1 || len === max) return str;
  if (num === 2) return str + str;

  if (cache !== str || typeof cache === 'undefined') {
    res = cache = str;
    num--;
  }

  var rlen: number = res.length;
  while (max > rlen && num > 0) {
    if (num & 1) {
      res += str;
    }
    num >>= 1;
    str += str;
  }
  return res.substr(0, max);
}

/**
 * Results cache
 */

var res: string = '';
var cache: string;
