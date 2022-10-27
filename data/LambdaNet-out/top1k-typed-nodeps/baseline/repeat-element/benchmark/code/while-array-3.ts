'use strict';

module.exports = function(val: String, num: Number) {
  return repeat(val, num, []);
};

function repeat(val: String, num: Number, arr: Object): Object {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}
