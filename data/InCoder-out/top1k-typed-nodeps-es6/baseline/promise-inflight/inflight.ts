'use strict'
export default inflight;

let Bluebird
try {
  Bluebird = require('bluebird')
} catch (_) {
  Bluebird = Promise
}

const active = {}
inflight.active = active
function inflight (unique: number,  doFly: Function) {
  return Bluebird.all([unique, doFly]).then(function (args: any) {
    const unique = args[0]
    const doFly = args[1]
    if (Array.isArray(unique)) {
      return Bluebird.all(unique).then(function (uniqueArr: Array<string>) {
        return _inflight(uniqueArr.join(''), doFly)
      })
    } else {
      return _inflight(unique, doFly)
    }
  })

  function _inflight (unique: number,  doFly: Function) {
    if (!active[unique]) {
      active[unique] = (new Bluebird(function (resolve: Function) {
        return resolve(doFly())
      }))
      active[unique].then(cleanup, cleanup)
      function cleanup() { delete active[unique] }
    }
    return active[unique]
  }
}