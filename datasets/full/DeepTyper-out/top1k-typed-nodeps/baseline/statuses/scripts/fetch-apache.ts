'use strict'

var getBody: any = require('raw-body')
var https: any = require('https')
var path: any = require('path')
var write: any = require('./lib/write')

var URL: string = 'https://svn.apache.org/repos/asf/httpd/httpd/trunk/modules/http/http_protocol.c'
var HEADERS: any = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res: any): void {
  getBody(res, true, function (err: any, body: any) {
    if (err) throw err

    var block: any = /status_lines\[[^\]]*\]\s*=\s*{([^}]+)};/m.exec(body)[1]
    var codes: {} = {}
    var match: any
    var regexp: RegExp = /"([0-9]+) ([^"]+)"/g

    while ((match = regexp.exec(block))) {
      codes[match[1]] = match[2]
    }

    write(path.join(__dirname, '../src/apache.json'), codes)
  })
})
