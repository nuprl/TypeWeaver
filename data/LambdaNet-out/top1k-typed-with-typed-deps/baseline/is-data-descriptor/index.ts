'use strict';

const hasOwn: Function = (obj: String, key: String) => Object.prototype.hasOwnProperty.call(obj, key);
const isObject: Function = (val: Number) => {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
};

const isDescriptor: Function = (obj: Array, key: String) => {
  if (!isObject(obj)) return false;
  let desc: Object = key ? Object.getOwnPropertyDescriptor(obj, key) : obj;
  if (isObject(desc)) {
    let booleans: Array = ['configurable', 'enumerable', 'writable'];
    if (!hasOwn(desc, 'value') || hasOwn(desc, 'get') || hasOwn(desc, 'set')) {
      return false;
    }
    for (let key of Object.keys(desc)) {
      if (booleans.includes(key) && typeof desc[key] !== 'boolean') {
        return false;
      }
      if (!booleans.includes(key) && key !== 'value') {
        return false;
      }
    }
    return true;
  }
  return false;
};

module.exports = isDescriptor;
