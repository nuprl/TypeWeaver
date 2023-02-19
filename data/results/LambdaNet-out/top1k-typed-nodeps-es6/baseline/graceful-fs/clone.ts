'use strict'

export default clone;

var getPrototypeOf: Function = Object.getPrototypeOf || function (obj: object) {
  return obj.__proto__
}

function clone (obj: string): object {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy: object = { __proto__: getPrototypeOf(obj) }
  else
    var copy: object = Object.create(null)

  Object.getOwnPropertyNames(obj).forEach(function (key: string) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
  })

  return copy
}
