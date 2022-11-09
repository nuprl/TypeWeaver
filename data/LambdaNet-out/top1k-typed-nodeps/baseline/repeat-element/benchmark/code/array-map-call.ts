'use strict';

module.exports = function repeat(ele: String, num: Number): String {
  return Array.prototype.map.call([] + Array(num + 1), function () {
    return ele;
  });
};
