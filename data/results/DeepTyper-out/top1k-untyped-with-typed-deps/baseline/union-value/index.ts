'use strict';

const get = require('get-value');
const set = require('set-value');

const isObject: boolean = (val: any) => {
  return val != null && typeof val === 'object' && !Array.isArray(val);
};

const flatten: any[] = (...args) => {
  let res: any[] = [];
  let flat: any = (arr: any) => {
    for (let ele of arr) Array.isArray(ele) ? flat(ele, res) : res.push(ele);
  };
  flat(args);
  return res;
};

const unique: any[] = (arr: any[]) => arr.filter((v: any, i: number) => arr.indexOf(v) === i);
const union: any = (...args) => unique(flatten(...args));
const first: any = (...args) => args.find((v: any) => v != null);

module.exports = (obj: any, prop: any, value: any) => {
  if (!isObject(obj)) {
    throw new TypeError('expected the first argument to be an object');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('expected the second argument to be a string');
  }

  let arr: any[] = [].concat(first(get(obj, prop), []));
  set(obj, prop, union(arr, [].concat(first(value, []))));
  return obj;
};
