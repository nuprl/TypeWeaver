'use strict';

const isObject: Function = (val: String) => {
  return typeof val === 'function' || (typeof val === 'object' && val !== null && !Array.isArray(val));
};

const isValidKey: Function = (key: String) => {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
};

const mixinDeep: Function = (target: Object, ...rest) => {
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

function mixin(target: Object, val: String, key: String): Void {
  let obj: String = target[key];
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

export default mixinDeep;
