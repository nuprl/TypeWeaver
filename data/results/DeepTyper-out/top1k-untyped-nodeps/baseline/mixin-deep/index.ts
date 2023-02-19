'use strict';

const isObject: boolean = (val: any) => {
  return typeof val === 'function' || (typeof val === 'object' && val !== null && !Array.isArray(val));
};

const isValidKey: boolean = (key: string) => {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
};

const mixinDeep: void = (target, ...rest) => {
  for (let obj of rest) {
    if (isObject(obj)) {
      for (let key in obj) {
        if (isValidKey(key)) {
          mixin(target, obj[key], key);
        }
      }
    }
  }
  return target;
};

function mixin(target: any, val: any, key: string): any {
  let obj: any = target[key];
  if (isObject(val) && isObject(obj)) {
    mixinDeep(obj, val);
  } else {
    target[key] = val;
  }
}

/**
 * Expose mixinDeep
 * @type {Function}
 */

module.exports = mixinDeep;
