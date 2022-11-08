'use strict'

import { promisify } from 'util';

const handler = {
  get: function (target: any,  prop: string | symbol,  receiver: any) {
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
        Reflect.get(target, prop, receiver).apply(target, [...arguments, function (err: Error,  result: Object) {
          if (err) {
            return reject(err)
          }
          resolve(result)
        }])
      })
    }
  }
}

export default function (thingToPromisify: ThingToPromi) {
  if (typeof thingToPromisify === 'function') {
    return promisify(thingToPromisify)
  }
  if (typeof thingToPromisify === 'object') {
    return new Proxy(thingToPromisify, handler)
  }
  throw new TypeError('Can only promisify functions or objects')
};