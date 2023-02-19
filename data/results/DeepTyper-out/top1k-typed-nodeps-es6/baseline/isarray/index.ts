'use strict';

var toString: string = {}.toString;

export default Array.isArray || function (arr: any) {
  return toString.call(arr) === '[object Array]';
};
