'use strict';

const isObject: Function = (val: string) => {
  return typeof val === 'function' || (typeof val === 'object' && val !== null && !Array.isArray(val));
};

const isValidKey: Function = (key: string) => {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
};

const mixinDeep: Function = (target: object, ...rest) => {
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

function mixin(target: object, val: string, key: string): void {
  let obj: string = target[key];
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
