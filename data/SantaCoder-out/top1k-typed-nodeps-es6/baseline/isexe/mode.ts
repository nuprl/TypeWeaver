export default isexe;
isexe.sync = sync

import fs from 'fs';

function isexe (path: string, options: IsexeOptions, cb: any) {
  fs.stat(path, function (er: Error, stat: fs.Stats) {
    cb(er, er ? false : checkStat(stat, options))
  })
}

function sync (path: string, options: SyncOptions) {
  return checkStat(fs.statSync(path), options)
}

function checkStat (stat: string, options: CheckStatOptions) {
  return stat.isFile() && checkMode(stat, options)
}

function checkMode (stat: FS.Stats, options: FS.Stats.CheckModeOptions) {
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