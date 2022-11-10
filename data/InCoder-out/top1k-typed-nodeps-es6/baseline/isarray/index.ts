'use strict';

var toString = {}.toString;

export default Array.isArray || function (arr: Array<any>) {
  return toString.call(arr) === '[object Array]';
};