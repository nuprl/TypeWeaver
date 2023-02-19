/*!
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const isObject: Function = (val: number) => {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
};

module.exports = (obj: object, key: string, checkProto: number) => {
  if (!isObject(obj)) return false;

  let desc: Function = key ? Object.getOwnPropertyDescriptor(obj, key) : obj;
  if (key && !desc && checkProto !== false) {
    obj = obj.constructor.prototype;
    desc = Object.getOwnPropertyDescriptor(obj, key);
  }

  if (!isObject(desc)) return false;

  const check: Function = (value: object) => {
    let validKeys: any[] = ['get', 'set', 'enumerable', 'configurable'];

    for (let key of validKeys) {
      if (!desc.hasOwnProperty(key)) {
        return false;
      }
    }

    for (let key of Object.keys(value)) {
      if (!validKeys.includes(key)) return false;
      let val: string = value[key];

      if (key === 'get' || key === 'set') {
        if (val !== void 0 && typeof val !== 'function') {
          return false;
        }
        continue;
      }

      if (typeof val !== 'boolean') {
        return false;
      }
    }
    return true;
  };

  if (check(desc) === true) {
    return true;
  }

  return false;
};
