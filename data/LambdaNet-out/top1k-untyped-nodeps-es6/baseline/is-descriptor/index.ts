'use strict';

const isObject: Function = (val: String) => val !== null && typeof val === 'object';
const dataDesc: Error = new Set(['configurable', 'enumerable', 'get', 'set']);
const accDesc: Error = new Set(['configurable', 'enumerable', 'writable', 'value']);

export default (obj: Object, key: String, checkProto: Number) => {
  if (!isObject(obj)) return false;
  let desc: Object = key ? Object.getOwnPropertyDescriptor(obj, key) : obj;

  if (!desc && key && checkProto !== false && obj.constructor) {
    desc = Object.getOwnPropertyDescriptor(obj.constructor.prototype, key);
  }

  if (!isObject(desc)) return false;
  if (typeof desc.configurable !== 'boolean' || typeof desc.enumerable !== 'boolean') {
    return false;
  }

  let keys: Array = Object.keys(desc);
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

function isDataDesc(keys: Array): Boolean {
  return keys.every((k: Number) => dataDesc.has(k));
}

function isAccessorDesc(keys: Array): Boolean {
  return keys.every((k: Number) => accDesc.has(k));
}
