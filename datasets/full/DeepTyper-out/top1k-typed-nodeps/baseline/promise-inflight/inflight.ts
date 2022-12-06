'use strict'
module.exports = inflight

let Bluebird: any
try {
  Bluebird = require('bluebird')
} catch (_) {
  Bluebird = Promise
}

const active: any = {}
inflight.active = active
function inflight (unique: any, doFly: any): any {
  return Bluebird.all([unique, doFly]).then(function (args: any) {
    const unique: any = args[0]
    const doFly: any = args[1]
    if (Array.isArray(unique)) {
      return Bluebird.all(unique).then(function (uniqueArr: any) {
        return _inflight(uniqueArr.join(''), doFly)
      })
    } else {
      return _inflight(unique, doFly)
    }
  })

  function _inflight (unique: any, doFly: any): any {
    if (!active[unique]) {
      active[unique] = (new Bluebird(function (resolve: any) {
        return resolve(doFly())
      }))
      active[unique].then(cleanup, cleanup)
      function cleanup(): void { delete active[unique] }
    }
    return active[unique]
  }
}
