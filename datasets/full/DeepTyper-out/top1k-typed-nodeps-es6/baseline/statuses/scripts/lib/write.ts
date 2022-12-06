'use strict'

import fs from 'fs';

export default function write (path: string, obj: any): void {
  var fd: any = fs.openSync(path, 'w')
  var keys: string[] = Object.keys(obj).sort()

  fs.writeSync(fd, '{\n')

  keys.forEach(function (key: string, i: number, arr: any) {
    fs.writeSync(fd, '  ' + JSON.stringify(key) +
      ': ' + JSON.stringify(obj[key]) +
      endLine.apply(this, arguments))
  })

  fs.writeSync(fd, '}\n')

  fs.closeSync(fd)
};

function endLine (val: any, index: number, array: any): void {
  var comma: number = index + 1 === array.length
    ? ''
    : ','
  return comma + '\n'
}
