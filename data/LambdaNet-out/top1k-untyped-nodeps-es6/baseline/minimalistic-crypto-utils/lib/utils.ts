'use strict';

var utils: HTMLElement = exports;

function toArray(msg: String, enc: Number): Array {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res: Array = [];
  if (typeof msg !== 'string') {
    for (var i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
    return res;
  }
  if (enc === 'hex') {
    msg = msg.replace(/[^a-z0-9]+/ig, '');
    if (msg.length % 2 !== 0)
      msg = '0' + msg;
    for (var i = 0; i < msg.length; i += 2)
      res.push(parseInt(msg[i] + msg[i + 1], 16));
  } else {
    for (var i = 0; i < msg.length; i++) {
      var c: Number = msg.charCodeAt(i);
      var hi: Number = c >> 8;
      var lo: Number = c & 0xff;
      if (hi)
        res.push(hi, lo);
      else
        res.push(lo);
    }
  }
  return res;
}
utils.toArray = toArray;

function zero2(word: String): String {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
utils.zero2 = zero2;

function toHex(msg: Array): String {
  var res: String = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
utils.toHex = toHex;

utils.encode = function encode(arr: String, enc: Number): String {
  if (enc === 'hex')
    return toHex(arr);
  else
    return arr;
};
