'use strict'

/* eslint no-proto: 0 */
export default Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);

function setProtoOf (obj: any, proto: any) {
  obj.__proto__ = proto
  return obj
}

function mixinProperties (obj: Object, proto: Object) {
  for (var prop in proto) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
      obj[prop] = proto[prop]
    }
  }
  return obj
}