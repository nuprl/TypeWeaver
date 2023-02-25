'use strict'

import fs from 'fs';

export default function write (path: string, obj: any) {
  var fd = fs.openSync(path, 'w')
  var keys = Object.keys(obj).sort()

  fs.writeSync(fd, '{\n')

  keys.forEach(function (key: string, i: number, arr: any[]) {
    fs.writeSync(fd, '  ' + JSON.stringify(key) +
      ': ' + JSON.stringify(obj[key]) +
      endLine.apply(this, arguments))
  })

  fs.writeSync(fd, '}\n')

  fs.closeSync(fd)
};

function endLine (val: string, index: number, array: string[]) {
  var comma = index + 1 === array.length
    ? ''
    : ','
  return comma + '\n'
}