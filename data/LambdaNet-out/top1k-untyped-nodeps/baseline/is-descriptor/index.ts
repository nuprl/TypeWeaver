'use strict';

const isObject: Function = (val: string) => val !== null && typeof val === 'object';
const dataDesc: Error = new Set(['configurable', 'enumerable', 'get', 'set']);
const accDesc: Error = new Set(['configurable', 'enumerable', 'writable', 'value']);

module.exports = (obj: object, key: string, checkProto: number) => {
  if (!isObject(obj)) return false;
  let desc: object = key ? Object.getOwnPropertyDescriptor(obj, key) : obj;

  if (!desc && key && checkProto !== false && obj.constructor) {
    desc = Object.getOwnPropertyDescriptor(obj.constructor.prototype, key);
  }

  if (!isObject(desc)) return false;
  if (typeof desc.configurable !== 'boolean' || typeof desc.enumerable !== 'boolean') {
    return false;
  }

  let keys: any[] = Object.keys(desc);
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

function isDataDesc(keys: any[]): boolean {
  return keys.every((k: number) => dataDesc.has(k));
}

function isAccessorDesc(keys: any[]): boolean {
  return keys.every((k: number) => accDesc.has(k));
}
