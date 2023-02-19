'use strict';

export default function repeat(ele, num) {
  return Array.apply([], new Array(num)).map(function (nil) {
    return ele;
  });
};
