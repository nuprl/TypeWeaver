'use strict'

import https from 'https';
import parser from 'csv-parse';
import path from 'path';
import toArray from 'stream-to-array';
import write from './lib/write';

var URL = 'https://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv'
var HEADERS = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res: Response) {
  toArray(res.pipe(parser()), function (err: Error,  rows: any) {
    if (err) throw err

    var codes = {}
    var headers = rows.shift().map(normalizeHeader)
    var reduceRows = generateRowMapper(headers)

    rows.forEach(function (row: Row) {
      var obj = row.reduce(reduceRows, {})

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

function generateRowMapper (headers: Array<string>) {
  return function reduceRows (obj: bject,  val: number,  index: number) {
    if (val !== '') {
      obj[headers[index]] = val
    }

    return obj
  }
}

function normalizeHeader (val: string | string[]) {
  return val.substr(0, 1).toLowerCase() + val.substr(1).replace(/ (.)/, function (s: string,  c: string) {
    return c.toUpperCase()
  })
}