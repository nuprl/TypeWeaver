'use strict'

import https from 'https';
import parser from 'csv-parse';
import path from 'path';
import toArray from 'stream-to-array';
import write from './lib/write';

var URL: string = 'https://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv'
var HEADERS: object = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res: object): Void {
  toArray(res.pipe(parser()), function (err: boolean, rows: any[]) {
    if (err) throw err

    var codes: object = {}
    var headers: any[] = rows.shift().map(normalizeHeader)
    var reduceRows: any[] = generateRowMapper(headers)

    rows.forEach(function (row: any[]) {
      var obj: object = row.reduce(reduceRows, {})

      // skip unassigned codes
      if (obj.description === 'Unassigned') {
        return
      }

      // skip retired 306 code
      if (obj.value === '306') {
        return
      }

      codes[obj.value] = obj.description
    })

    write(path.join(__dirname, '../src/iana.json'), codes)
  })
})

function generateRowMapper (headers: object): Function {
  return function reduceRows (obj: object, val: string, index: number): object {
    if (val !== '') {
      obj[headers[index]] = val
    }

    return obj
  }
}

function normalizeHeader (val: string): string {
  return val.substr(0, 1).toLowerCase() + val.substr(1).replace(/ (.)/, function (s: Function, c: string) {
    return c.toUpperCase()
  })
}
