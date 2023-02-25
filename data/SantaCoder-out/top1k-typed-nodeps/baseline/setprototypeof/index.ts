'use strict'
/* eslint no-proto: 0 */
module.exports = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties)

function setProtoOf (obj: any, proto: any) {
  obj.__proto__ = proto
  return obj
}

function mixinProperties (obj: any, proto: any) {
  for (var prop in proto) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
      obj[prop] = proto[prop]
    }
  }
  return obj
}