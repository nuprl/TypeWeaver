'use strict';

import get from 'get-value';
import set from 'set-value';

const isObject: Function = (val: string) => {
  return val != null && typeof val === 'object' && !Array.isArray(val);
};

const flatten: Function = (...args) => {
  let res: any[] = [];
  let flat: Function = (arr: any[]) => {
    for (let ele of arr) Array.isArray(ele) ? flat(ele, res) : res.push(ele);
  };
  flat(args);
  return res;
};

const unique: Function = (arr: any[]) => arr.filter((v: string, i: number) => arr.indexOf(v) === i);
const union: Function = (...args) => unique(flatten(...args));
const first: Function = (...args) => args.find((v: string) => v != null);

export default (obj: any[], prop: string, value: string) => {
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
