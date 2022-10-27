'use strict'

var getBody: Function = require('raw-body')
var https: String = require('https')
var path: String = require('path')
var write: Function = require('./lib/write')

var URL: String = 'https://hg.nginx.org/nginx/raw-file/default/src/http/ngx_http_header_filter_module.c'
var HEADERS: Object = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res: String): Void {
  getBody(res, true, function (err: Boolean, body: String) {
    if (err) throw err

    var block: String = /ngx_http_status_lines\[] = {([^}]+)};/m.exec(body)[1]
    var codes: Object = {}
    var match: Object
    var regexp: RegExp = /ngx_string\("([0-9]+) ([^"]+)"\)/g

    while ((match = regexp.exec(block))) {
      codes[match[1]] = match[2]
    }

    write(path.join(__dirname, '../src/nginx.json'), codes)
  })
})
