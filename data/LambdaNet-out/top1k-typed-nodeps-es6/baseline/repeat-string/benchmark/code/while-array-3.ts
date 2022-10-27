'use strict';

export default function(val: String, num: String) {
  return repeat(val, num, []).join('');
};

function repeat(val: String, num: Number, arr: Object): Object {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}