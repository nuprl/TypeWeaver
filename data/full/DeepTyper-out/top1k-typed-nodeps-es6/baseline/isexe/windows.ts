export default isexe;
isexe.sync = sync

import fs from 'fs';

function checkPathExt (path: string, options: any): boolean {
  var pathext: boolean = options.pathExt !== undefined ?
    options.pathExt : process.env.PATHEXT

  if (!pathext) {
    return true
  }

  pathext = pathext.split(';')
  if (pathext.indexOf('') !== -1) {
    return true
  }
  for (var i = 0; i < pathext.length; i++) {
    var p: string = pathext[i].toLowerCase()
    if (p && path.substr(-p.length).toLowerCase() === p) {
      return true
    }
  }
  return false
}

function checkStat (stat: any, path: string, options: any): boolean {
  if (!stat.isSymbolicLink() && !stat.isFile()) {
    return false
  }
  return checkPathExt(path, options)
}

function isexe (path: string, options: any, cb: any): void {
  fs.stat(path, function (er: any, stat: any) {
    cb(er, er ? false : checkStat(stat, path, options))
  })
}

function sync (path: string, options: any): boolean {
  return checkStat(fs.statSync(path), path, options)
}
