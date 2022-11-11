'use strict'

import fs from 'fs';

export default function write (path: Buffer,  obj: any) {
  var fd = fs.openSync(path, 'w')
  var keys = Object.keys(obj).sort()

  fs.writeSync(fd, '{\n')

  keys.forEach(function (key: any,  i: any,  arr: any[]) {
    fs.writeSync(fd, '  ' + JSON.stringify(key) +
      ': ' + JSON.stringify(obj[key]) +
      endLine.apply(this, arguments))
  })

  fs.writeSync(fd, '}\n')

  fs.closeSync(fd)
};

function endLine (val: number,  index: number,  array: number[]) {
  var comma = index + 1 === array.length
    ? ''
    : ','
  return comma + '\n'
}