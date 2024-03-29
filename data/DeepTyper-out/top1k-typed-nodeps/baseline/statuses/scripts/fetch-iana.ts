'use strict'

var https: any = require('https')
var parser: any = require('csv-parse')
var path: any = require('path')
var toArray: any = require('stream-to-array')
var write: any = require('./lib/write')

var URL: string = 'https://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv'
var HEADERS: any = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res: any): void {
  toArray(res.pipe(parser()), function (err: any, rows: any) {
    if (err) throw err

    var codes: {} = {}
    var headers: any = rows.shift().map(normalizeHeader)
    var reduceRows: any = generateRowMapper(headers)

    rows.forEach(function (row: any) {
      var obj: any = row.reduce(reduceRows, {})

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

function generateRowMapper (headers: any): any {
  return function reduceRows (obj: any, val: any, index: number): any {
    if (val !== '') {
      obj[headers[index]] = val
    }

    return obj
  }
}

function normalizeHeader (val: string): string {
  return val.substr(0, 1).toLowerCase() + val.substr(1).replace(/ (.)/, function (s: string, c: string) {
    return c.toUpperCase()
  })
}
