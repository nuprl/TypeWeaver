'use strict';

export default function repeat(ele, num) {
  var arr = [];

  for (var i = num; i > 0; i--) {
    arr.push(ele);
  }

  return arr;
};
