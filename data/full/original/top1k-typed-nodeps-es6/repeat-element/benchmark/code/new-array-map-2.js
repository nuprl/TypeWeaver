'use strict';

export default function repeat(ele, num) {
  return Array(num + 1).join(1).split('').map(function (nil) {
    return ele;
  });
};

