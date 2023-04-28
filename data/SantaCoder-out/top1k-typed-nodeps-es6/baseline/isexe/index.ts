import fs from 'fs';
var core
if (process.platform === 'win32' || global.TESTING_WINDOWS) {
  core = require('./windows.js')
} else {
  core = require('./mode.js')
}

export default isexe;
isexe.sync = sync

function isexe (path: string, options: Options, cb: any) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  if (!cb) {
    if (typeof Promise !== 'function') {
      throw new TypeError('callback not provided')
    }

    return new Promise(function (resolve: Function, reject: Function) {
      isexe(path, options || {}, function (er: Error, is: boolean) {
        if (er) {
          reject(er)
        } else {
          resolve(is)
        }
      })
    })
  }

  core(path, options || {}, function (er: Error, is: boolean) {
    // ignore EACCES because that just means we aren't allowed to run it
    if (er) {
      if (er.code === 'EACCES' || options && options.ignoreErrors) {
        er = null
        is = false
      }
    }
    cb(er, is)
  })
}

function sync (path: string, options: SyncOptions) {
  // my kingdom for a filtered catch
  try {
    return core.sync(path, options || {})
  } catch (er) {
    if (options && options.ignoreErrors || er.code === 'EACCES') {
      return false
    } else {
      throw er
    }
  }
}