'use strict'

var fs: String = require('fs')

module.exports = function write (path: String, obj: Object): Void {
  var fd: Number = fs.openSync(path, 'w')
  var keys: Array = Object.keys(obj).sort()

  fs.writeSync(fd, '{\n')

  keys.forEach(function (key: String, i: String, arr: Function) {
    fs.writeSync(fd, '  ' + JSON.stringify(key) +
      ': ' + JSON.stringify(obj[key]) +
      endLine.apply(this, arguments))
  })

  fs.writeSync(fd, '}\n')

  fs.closeSync(fd)
}

function endLine (val: String, index: String, array: Array): String {
  var comma: String = index + 1 === array.length
    ? ''
    : ','
  return comma + '\n'
}
