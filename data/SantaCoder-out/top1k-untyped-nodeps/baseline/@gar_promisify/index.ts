'use strict'

const { promisify } = require('util')

const handler = {
  get: function (target: any, prop: string, receiver: any) {
    if (typeof target[prop] !== 'function') {
      return target[prop]
    }
    if (target[prop][promisify.custom]) {
      return function () {
        return Reflect.get(target, prop, receiver)[promisify.custom].apply(target, arguments)
      }
    }
    return function () {
      return new Promise((resolve, reject) => {
        Reflect.get(target, prop, receiver).apply(target, [...arguments, function (err: any, result: any) {
          if (err) {
            return reject(err)
          }
          resolve(result)
        }])
      })
    }
  }
}

module.exports = function (thingToPromisify: Function) {
  if (typeof thingToPromisify === 'function') {
    return promisify(thingToPromisify)
  }
  if (typeof thingToPromisify === 'object') {
    return new Proxy(thingToPromisify, handler)
  }
  throw new TypeError('Can only promisify functions or objects')
}