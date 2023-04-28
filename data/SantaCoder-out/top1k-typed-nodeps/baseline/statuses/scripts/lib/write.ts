'use strict'

var fs = require('fs')

module.exports = function write (path: string, obj: Object) {
  var fd = fs.openSync(path, 'w')
  var keys = Object.keys(obj).sort()

  fs.writeSync(fd, '{\n')

  keys.forEach(function (key: string, i: number, arr: string[]) {
    fs.writeSync(fd, '  ' + JSON.stringify(key) +
      ': ' + JSON.stringify(obj[key]) +
      endLine.apply(this, arguments))
  })

  fs.writeSync(fd, '}\n')

  fs.closeSync(fd)
}

function endLine (val: string, index: number, array: string[]) {
  var comma = index + 1 === array.length
    ? ''
    : ','
  return comma + '\n'
}