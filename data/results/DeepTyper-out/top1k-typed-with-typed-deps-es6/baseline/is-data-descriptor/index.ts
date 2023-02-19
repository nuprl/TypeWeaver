'use strict';

const hasOwn: boolean = (obj: any, key: string) => Object.prototype.hasOwnProperty.call(obj, key);
const isObject: boolean = (val: any) => {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
};

const isDescriptor: boolean = (obj: any, key: string) => {
  if (!isObject(obj)) return false;
  let desc: any = key ? Object.getOwnPropertyDescriptor(obj, key) : obj;
  if (isObject(desc)) {
    let booleans: string[] = ['configurable', 'enumerable', 'writable'];
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

export default isDescriptor;
