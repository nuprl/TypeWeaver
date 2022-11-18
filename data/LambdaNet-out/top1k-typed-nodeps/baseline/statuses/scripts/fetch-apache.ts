'use strict'

var getBody: Function = require('raw-body')
var https: string = require('https')
var path: string = require('path')
var write: Function = require('./lib/write')

var URL: string = 'https://svn.apache.org/repos/asf/httpd/httpd/trunk/modules/http/http_protocol.c'
var HEADERS: object = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res: string): Void {
  getBody(res, true, function (err: boolean, body: string) {
    if (err) throw err

    var block: string = /status_lines\[[^\]]*\]\s*=\s*{([^}]+)};/m.exec(body)[1]
    var codes: object = {}
    var match: object
    var regexp: RegExp = /"([0-9]+) ([^"]+)"/g

    while ((match = regexp.exec(block))) {
      codes[match[1]] = match[2]
    }

    write(path.join(__dirname, '../src/apache.json'), codes)
  })
})
