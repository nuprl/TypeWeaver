'use strict'

import { promisify } from 'util';

const handler: Object = {
  get: function (target: Object, prop: String, receiver: String) {
    if (typeof target[prop] !== 'function') {
      return target[prop]
    }
    if (target[prop][promisify.custom]) {
      return function () {
        return Reflect.get(target, prop, receiver)[promisify.custom].apply(target, arguments)
      }
    }
    return function () {
      return new Promise((resolve: Function, reject: Function) => {
        Reflect.get(target, prop, receiver).apply(target, [...arguments, function (err: Boolean, result: Array) {
          if (err) {
            return reject(err)
          }
          resolve(result)
        }])
      })
    }
  }
}

export default function (thingToPromisify: String) {
  if (typeof thingToPromisify === 'function') {
    return promisify(thingToPromisify)
  }
  if (typeof thingToPromisify === 'object') {
    return new Proxy(thingToPromisify, handler)
  }
  throw new TypeError('Can only promisify functions or objects')
};
