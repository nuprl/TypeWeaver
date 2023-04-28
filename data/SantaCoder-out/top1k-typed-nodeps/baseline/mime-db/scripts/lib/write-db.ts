/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

var fs = require('fs')

module.exports = function writeDatabaseSync (fileName: string, obj: any) {
  var fd = fs.openSync(fileName, 'w')
  var keys = Object.keys(obj).sort()

  fs.writeSync(fd, '{\n')

  keys.forEach(function (key: string, i: number, arr: string[]) {
    fs.writeSync(fd, '  ' + JSON.stringify(key) + ': {')

    var end = endLine.apply(this, arguments)
    var data = obj[key]
    var keys = Object.keys(data).sort(sortDataKeys)

    if (keys.length === 0) {
      fs.writeSync(fd, '}' + end)
      return
    }

    fs.writeSync(fd, '\n')
    keys.forEach(function (key: string, i: number, arr: string[]) {
      var end = endLine.apply(this, arguments)
      var val = data[key]

      if (val !== undefined) {
        var str = Array.isArray(val) && val.some(function (v: any) { return String(v).length > 15 })
          ? JSON.stringify(val, null, 2).split('\n').join('\n    ')
          : JSON.stringify(val)

        fs.writeSync(fd, '    ' + JSON.stringify(key) + ': ' + str + end)
      }
    })

    fs.writeSync(fd, '  }' + end)
  })

  fs.writeSync(fd, '}\n')

  fs.closeSync(fd)
}

function endLine (key: string, i: number, arr: string[]) {
  var comma = i + 1 === arr.length
    ? ''
    : ','
  return comma + '\n'
}

function sortDataKeys (a: string, b: string) {
  var cmp = a.localeCompare(b)

  return cmp && (a === 'source' || b === 'source')
    ? (a === 'source' ? -1 : 1)
    : cmp
}