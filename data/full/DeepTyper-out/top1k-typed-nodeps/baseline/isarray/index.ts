'use strict';

var toString: string = {}.toString;

module.exports = Array.isArray || function (arr: any) {
  return toString.call(arr) === '[object Array]';
};
