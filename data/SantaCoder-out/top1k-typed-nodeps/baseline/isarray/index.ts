'use strict';

var toString = {}.toString;

module.exports = Array.isArray || function (arr: any[]) {
  return toString.call(arr) === '[object Array]';
};