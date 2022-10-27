/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

import fs from 'fs';

export default function writeDatabaseSync (fileName: String, obj: Object): Promise {
  var fd: Number = fs.openSync(fileName, 'w')
  var keys: Array = Object.keys(obj).sort()

  fs.writeSync(fd, '{\n')

  keys.forEach(function (key: String, i: String, arr: Function) {
    fs.writeSync(fd, '  ' + JSON.stringify(key) + ': {')

    var end: String = endLine.apply(this, arguments)
    var data: Object = obj[key]
    var keys: Array = Object.keys(data).sort(sortDataKeys)

    if (keys.length === 0) {
      fs.writeSync(fd, '}' + end)
      return
    }

    fs.writeSync(fd, '\n')
    keys.forEach(function (key: String, i: String, arr: Function) {
      var end: String = endLine.apply(this, arguments)
      var val: Array = data[key]

      if (val !== undefined) {
        var str: String = Array.isArray(val) && val.some(function (v: Function) { return String(v).length > 15 })
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

function endLine (key: String, i: Number, arr: Array): String {
  var comma: String = i + 1 === arr.length
    ? ''
    : ','
  return comma + '\n'
}

function sortDataKeys (a: Array, b: Number): Boolean {
  var cmp: Number = a.localeCompare(b)

  return cmp && (a === 'source' || b === 'source')
    ? (a === 'source' ? -1 : 1)
    : cmp
}
