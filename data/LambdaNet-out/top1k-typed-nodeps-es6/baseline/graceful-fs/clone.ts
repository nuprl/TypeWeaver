'use strict'

export default clone;

var getPrototypeOf: Function = Object.getPrototypeOf || function (obj: Object) {
  return obj.__proto__
}

function clone (obj: String): Object {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy: Object = { __proto__: getPrototypeOf(obj) }
  else
    var copy: Object = Object.create(null)

  Object.getOwnPropertyNames(obj).forEach(function (key: String) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
  })

  return copy
}
