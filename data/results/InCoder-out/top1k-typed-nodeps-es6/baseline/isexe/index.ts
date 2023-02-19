import fs from 'fs';
var core
if (process.platform === 'win32' || global.TESTING_WINDOWS) {
  core = require('./windows.js')
} else {
  core = require('./mode.js')
}

export default isexe;
isexe.sync = sync

function isexe (path: string | Buffer,  options: any,  cb: Function) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  if (!cb) {
    if (typeof Promise !== 'function') {
      throw new TypeError('callback not provided')
    }

    return new Promise(function (resolve: any,  reject: any) {
      isexe(path, options || {}, function (er: Error,  is: number) {
        if (er) {
          reject(er)
        } else {
          resolve(is)
        }
      })
    })
  }

  core(path, options || {}, function (er: Error,  is: number) {
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

function sync (path: Path,  options: Options) {
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