module.exports = isexe
isexe.sync = sync

var fs: any = require('fs')

function isexe (path: string, options: any, cb: any): void {
  fs.stat(path, function (er: any, stat: any) {
    cb(er, er ? false : checkStat(stat, options))
  })
}

function sync (path: string, options: any): boolean {
  return checkStat(fs.statSync(path), options)
}

function checkStat (stat: any, options: any): boolean {
  return stat.isFile() && checkMode(stat, options)
}

function checkMode (stat: any, options: any): boolean {
  var mod: any = stat.mode
  var uid: any = stat.uid
  var gid: number = stat.gid

  var myUid: number = options.uid !== undefined ?
    options.uid : process.getuid && process.getuid()
  var myGid: number = options.gid !== undefined ?
    options.gid : process.getgid && process.getgid()

  var u: number = parseInt('100', 8)
  var g: number = parseInt('010', 8)
  var o: number = parseInt('001', 8)
  var ug: boolean = u | g

  var ret: number = (mod & o) ||
    (mod & g) && gid === myGid ||
    (mod & u) && uid === myUid ||
    (mod & ug) && myUid === 0

  return ret
}
