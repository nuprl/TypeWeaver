'use strict'

module.exports = clone

var getPrototypeOf = Object.getPrototypeOf || function (obj: any) {
  return obj.__proto__
}

function clone (obj: any) {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy = { __proto__: getPrototypeOf(obj) }
  else
    var copy = Object.create(null)

  Object.getOwnPropertyNames(obj).forEach(function (key: string) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
  })

  return copy
}