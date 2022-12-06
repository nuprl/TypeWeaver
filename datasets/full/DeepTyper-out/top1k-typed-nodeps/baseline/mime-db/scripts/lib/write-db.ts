/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

var fs: any = require('fs')

module.exports = function writeDatabaseSync (fileName: string, obj: any): string {
  var fd: any = fs.openSync(fileName, 'w')
  var keys: string[] = Object.keys(obj).sort()

  fs.writeSync(fd, '{\n')

  keys.forEach(function (key: string, i: number, arr: any) {
    fs.writeSync(fd, '  ' + JSON.stringify(key) + ': {')

    var end: any = endLine.apply(this, arguments)
    var data: any = obj[key]
    var keys: string[] = Object.keys(data).sort(sortDataKeys)

    if (keys.length === 0) {
      fs.writeSync(fd, '}' + end)
      return
    }

    fs.writeSync(fd, '\n')
    keys.forEach(function (key: string, i: any, arr: any) {
      var end: any = endLine.apply(this, arguments)
      var val: any = data[key]

      if (val !== undefined) {
        var str: any = Array.isArray(val) && val.some(function (v: any) { return String(v).length > 15 })
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

function endLine (key: string, i: number, arr: any): void {
  var comma: number = i + 1 === arr.length
    ? ''
    : ','
  return comma + '\n'
}

function sortDataKeys (a: string, b: string): string {
  var cmp: boolean = a.localeCompare(b)

  return cmp && (a === 'source' || b === 'source')
    ? (a === 'source' ? -1 : 1)
    : cmp
}
