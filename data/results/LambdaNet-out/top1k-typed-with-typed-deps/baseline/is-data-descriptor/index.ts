'use strict';

const hasOwn: Function = (obj: string, key: string) => Object.prototype.hasOwnProperty.call(obj, key);
const isObject: Function = (val: number) => {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
};

const isDescriptor: Function = (obj: any[], key: string) => {
  if (!isObject(obj)) return false;
  let desc: object = key ? Object.getOwnPropertyDescriptor(obj, key) : obj;
  if (isObject(desc)) {
    let booleans: any[] = ['configurable', 'enumerable', 'writable'];
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
