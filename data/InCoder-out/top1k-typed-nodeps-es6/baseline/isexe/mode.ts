export default isexe;
isexe.sync = sync

import fs from 'fs';

function isexe (path: string | Buffer,  options: IExecFileOptions,  cb: IExecFileCallback) {
  fs.stat(path, function (er: Error,  stat: fs.Stat) {
    cb(er, er ? false : checkStat(stat, options))
  })
}

function sync (path: String,  options: Object) {
  return checkStat(fs.statSync(path), options)
}

function checkStat (stat: Stats,  options: StatOptions) {
  return stat.isFile() && checkMode(stat, options)
}

function checkMode (stat: fs.Stat,  options: any) {
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