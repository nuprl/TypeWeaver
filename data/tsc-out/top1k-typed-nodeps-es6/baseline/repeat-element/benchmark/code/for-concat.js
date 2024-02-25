'use strict';

export default function repeat(ele, num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr = arr.concat(ele);
  }

  return arr;
};
