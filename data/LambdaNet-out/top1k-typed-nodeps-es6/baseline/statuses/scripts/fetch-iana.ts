'use strict'

import https from 'https';
import parser from 'csv-parse';
import path from 'path';
import toArray from 'stream-to-array';
import write from './lib/write';

var URL: String = 'https://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv'
var HEADERS: Object = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res: Object): Void {
  toArray(res.pipe(parser()), function (err: Boolean, rows: Array) {
    if (err) throw err

    var codes: Object = {}
    var headers: Array = rows.shift().map(normalizeHeader)
    var reduceRows: Array = generateRowMapper(headers)

    rows.forEach(function (row: Array) {
      var obj: Object = row.reduce(reduceRows, {})

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

function generateRowMapper (headers: Object): Function {
  return function reduceRows (obj: Object, val: String, index: Number): Object {
    if (val !== '') {
      obj[headers[index]] = val
    }

    return obj
  }
}

function normalizeHeader (val: String): String {
  return val.substr(0, 1).toLowerCase() + val.substr(1).replace(/ (.)/, function (s: Function, c: String) {
    return c.toUpperCase()
  })
}
