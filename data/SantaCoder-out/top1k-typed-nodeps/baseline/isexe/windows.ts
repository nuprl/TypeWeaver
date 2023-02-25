module.exports = isexe
isexe.sync = sync

var fs = require('fs')

function checkPathExt (path: string, options: CheckPathOptions) {
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

function checkStat (stat: Stat, path: string, options: CheckStatOptions) {
  if (!stat.isSymbolicLink() && !stat.isFile()) {
    return false
  }
  return checkPathExt(path, options)
}

function isexe (path: string, options: IsexeOptions, cb: any) {
  fs.stat(path, function (er: Error, stat: fs.Stats) {
    cb(er, er ? false : checkStat(stat, path, options))
  })
}

function sync (path: string, options: SyncOptions) {
  return checkStat(fs.statSync(path), path, options)
}