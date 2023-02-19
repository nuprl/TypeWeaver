/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

var fs: string = require('fs')

module.exports = function writeDatabaseSync (fileName: string, obj: object): void {
  var fd: number = fs.openSync(fileName, 'w')
  var keys: any[] = Object.keys(obj).sort()

  fs.writeSync(fd, '{\n')

  keys.forEach(function (key: string, i: string, arr: Function) {
    fs.writeSync(fd, '  ' + JSON.stringify(key) + ': {')

    var end: string = endLine.apply(this, arguments)
    var data: object = obj[key]
    var keys: any[] = Object.keys(data).sort(sortDataKeys)

    if (keys.length === 0) {
      fs.writeSync(fd, '}' + end)
      return
    }

    fs.writeSync(fd, '\n')
    keys.forEach(function (key: string, i: string, arr: Function) {
      var end: string = endLine.apply(this, arguments)
      var val: any[] = data[key]

      if (val !== undefined) {
        var str: string = Array.isArray(val) && val.some(function (v: Function) { return String(v).length > 15 })
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

function endLine (key: string, i: number, arr: any[]): string {
  var comma: string = i + 1 === arr.length
    ? ''
    : ','
  return comma + '\n'
}

function sortDataKeys (a: any[], b: number): boolean {
  var cmp: number = a.localeCompare(b)

  return cmp && (a === 'source' || b === 'source')
    ? (a === 'source' ? -1 : 1)
    : cmp
}
