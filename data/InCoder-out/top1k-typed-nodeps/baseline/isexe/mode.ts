module.exports = isexe
isexe.sync = sync

var fs = require('fs')

function isexe (path: string | Buffer,  options: any,  cb: Function) {
  fs.stat(path, function (er: Error,  stat: fs.Stat) {
    cb(er, er ? false : checkStat(stat, options))
  })
}

function sync (path: Path,  options: Options) {
  return checkStat(fs.statSync(path), options)
}

function checkStat (stat: Stat,  options: Options) {
  return stat.isFile() && checkMode(stat, options)
}

function checkMode (stat: fs.Stats,  options: any) {
  var mod = stat.mode
  var uid = stat.uid
  var gid = stat.gid

  var myUid = options.uid !== undefined ?
    options.uid : process.getuid && process.getuid()
  var myGid = options.gid !== undefined ?
    options.gid : process.getgid && process.getgid()

  var u = parseInt('100', 8)
  var g = parseInt('010', 8)
  var o = parseInt('001', 8)
  var ug = u | g

  var ret = (mod & o) ||
    (mod & g) && gid === myGid ||
    (mod & u) && uid === myUid ||
    (mod & ug) && myUid === 0

  return ret
}