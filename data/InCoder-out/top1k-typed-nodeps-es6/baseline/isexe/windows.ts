export default isexe;
isexe.sync = sync

import fs from 'fs';

function checkPathExt (path: string | string[],  options: IPathOptions) {
  var pathext = options.pathExt !== undefined ?
    options.pathExt : process.env.PATHEXT

  if (!pathext) {
    return true
  }

  pathext = pathext.split(';')
  if (pathext.indexOf('') !== -1) {
    return true
  }
  for (var i = 0; i < pathext.length; i++) {
    var p = pathext[i].toLowerCase()
    if (p && path.substr(-p.length).toLowerCase() === p) {
      return true
    }
  }
  return false
}

function checkStat (stat: Stats,  path: Path,  options: Stats.Options) {
  if (!stat.isSymbolicLink() && !stat.isFile()) {
    return false
  }
  return checkPathExt(path, options)
}

function isexe (path: string | Buffer,  options: IExecFileOptions,  cb: IExecFileCallback) {
  fs.stat(path, function (er: Error,  stat: fs.Stat) {
    cb(er, er ? false : checkStat(stat, path, options))
  })
}

function sync (path: String,  options: Object) {
  return checkStat(fs.statSync(path), path, options)
}