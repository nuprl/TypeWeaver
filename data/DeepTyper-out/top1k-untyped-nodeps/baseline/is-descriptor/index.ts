'use strict';

const isObject: boolean = (val: any) => val !== null && typeof val === 'object';
const dataDesc: Set<any> = new Set(['configurable', 'enumerable', 'get', 'set']);
const accDesc: Set<string> = new Set(['configurable', 'enumerable', 'writable', 'value']);

module.exports = (obj: any, key: string, checkProto: boolean) => {
  if (!isObject(obj)) return false;
  let desc: PropertyDescriptor = key ? Object.getOwnPropertyDescriptor(obj, key) : obj;

  if (!desc && key && checkProto !== false && obj.constructor) {
    desc = Object.getOwnPropertyDescriptor(obj.constructor.prototype, key);
  }

  if (!isObject(desc)) return false;
  if (typeof desc.configurable !== 'boolean' || typeof desc.enumerable !== 'boolean') {
    return false;
  }

  let keys: string[] = Object.keys(desc);
  if (isDataDesc(keys)) {
    if (typeof desc.get !== 'function' && desc.get !== void 0) return false;
    if (typeof desc.set !== 'function' && desc.set !== void 0) return false;
    return true;
  }

  if (isAccessorDesc(keys)) {
    return typeof desc.writable === 'boolean';
  }
  return false;
};

function isDataDesc(keys: any): boolean {
  return keys.every((k: any) => dataDesc.has(k));
}

function isAccessorDesc(keys: any): boolean {
  return keys.every((k: any) => accDesc.has(k));
}
