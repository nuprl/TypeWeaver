/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

import fs from 'fs';

export default function writeDatabaseSync (fileName: string | Buffer,  obj: any) {
  var fd = fs.openSync(fileName, 'w')
  var keys = Object.keys(obj).sort()

  fs.writeSync(fd, '{\n')

  keys.forEach(function (key: any,  i: number,  arr: Array<any>) {
    fs.writeSync(fd, '  ' + JSON.stringify(key) + ': {')

    var end = endLine.apply(this, arguments)
    var data = obj[key]
    var keys = Object.keys(data).sort(sortDataKeys)

    if (keys.length === 0) {
      fs.writeSync(fd, '}' + end)
      return
    }

    fs.writeSync(fd, '\n')
    keys.forEach(function (key: any,  i: number,  arr: Array<any>) {
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
};

function endLine (key: number,  i: number,  arr: Array<any>) {
  var comma = i + 1 === arr.length
    ? ''
    : ','
  return comma + '\n'
}

function sortDataKeys (a: any,  b: any) {
  var cmp = a.localeCompare(b)

  return cmp && (a === 'source' || b === 'source')
    ? (a === 'source' ? -1 : 1)
    : cmp
}