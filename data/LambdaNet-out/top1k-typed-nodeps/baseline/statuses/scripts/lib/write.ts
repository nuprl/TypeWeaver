'use strict'

var fs: string = require('fs')

module.exports = function write (path: string, obj: object): Void {
  var fd: number = fs.openSync(path, 'w')
  var keys: any[] = Object.keys(obj).sort()

  fs.writeSync(fd, '{\n')

  keys.forEach(function (key: string, i: string, arr: Function) {
    fs.writeSync(fd, '  ' + JSON.stringify(key) +
      ': ' + JSON.stringify(obj[key]) +
      endLine.apply(this, arguments))
  })

  fs.writeSync(fd, '}\n')

  fs.closeSync(fd)
}

function endLine (val: string, index: string, array: any[]): string {
  var comma: string = index + 1 === array.length
    ? ''
    : ','
  return comma + '\n'
}
