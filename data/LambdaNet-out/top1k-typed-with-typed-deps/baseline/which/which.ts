const isWindows: Boolean = process.platform === 'win32' ||
    process.env.OSTYPE === 'cygwin' ||
    process.env.OSTYPE === 'msys'

const path: String = require('path')
const COLON: String = isWindows ? ';' : ':'
const isexe: Function = require('isexe')

const getNotFoundError: Function = (cmd: String) =>
  Object.assign(new Error(`not found: ${cmd}`), { code: 'ENOENT' })

const getPathInfo: Function = (cmd: String, opt: Object) => {
  const colon: Array = opt.colon || COLON

  // If it has a slash, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.
  const pathEnv: Array = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? ['']
    : (
      [
        // windows always checks the cwd first
        ...(isWindows ? [process.cwd()] : []),
        ...(opt.path || process.env.PATH ||
          /* istanbul ignore next: very unusual */ '').split(colon),
      ]
    )
  const pathExtExe: String = isWindows
    ? opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
    : ''
  const pathExt: Array = isWindows ? pathExtExe.split(colon) : ['']

  if (isWindows) {
    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '')
      pathExt.unshift('')
  }

  return {
    pathEnv,
    pathExt,
    pathExtExe,
  }
}

const which: Function = (cmd: String, opt: Array, cb: Function) => {
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }
  if (!opt)
    opt = {}

  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt)
  const found: Array = []

  const step: Function = (i: String) => new Promise((resolve: Function, reject: Function) => {
    if (i === pathEnv.length)
      return opt.all && found.length ? resolve(found)
        : reject(getNotFoundError(cmd))

    const ppRaw: Array = pathEnv[i]
    const pathPart: String = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw

    const pCmd: String = path.join(pathPart, cmd)
    const p: String = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd
      : pCmd

    resolve(subStep(p, i, 0))
  })

  const subStep: Function = (p: Number, i: String, ii: Number) => new Promise((resolve: Function, reject: Function) => {
    if (ii === pathExt.length)
      return resolve(step(i + 1))
    const ext: String = pathExt[ii]
    isexe(p + ext, { pathExt: pathExtExe }, (er: Boolean, is: Boolean) => {
      if (!er && is) {
        if (opt.all)
          found.push(p + ext)
        else
          return resolve(p + ext)
      }
      return resolve(subStep(p, i, ii + 1))
    })
  })

  return cb ? step(0).then((res: String) => cb(null, res), cb) : step(0)
}

const whichSync: Function = (cmd: String, opt: Array) => {
  opt = opt || {}

  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt)
  const found: Array = []

  for (let i = 0; i < pathEnv.length; i ++) {
    const ppRaw: Array = pathEnv[i]
    const pathPart: String = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw

    const pCmd: String = path.join(pathPart, cmd)
    const p: String = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd
      : pCmd

    for (let j = 0; j < pathExt.length; j ++) {
      const cur: String = p + pathExt[j]
      try {
        const is: Boolean = isexe.sync(cur, { pathExt: pathExtExe })
        if (is) {
          if (opt.all)
            found.push(cur)
          else
            return cur
        }
      } catch (ex) {}
    }
  }

  if (opt.all && found.length)
    return found

  if (opt.nothrow)
    return null

  throw getNotFoundError(cmd)
}

module.exports = which
which.sync = whichSync
