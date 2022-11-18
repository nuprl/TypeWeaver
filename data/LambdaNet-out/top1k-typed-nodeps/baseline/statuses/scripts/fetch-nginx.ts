'use strict'

var getBody: Function = require('raw-body')
var https: string = require('https')
var path: string = require('path')
var write: Function = require('./lib/write')

var URL: string = 'https://hg.nginx.org/nginx/raw-file/default/src/http/ngx_http_header_filter_module.c'
var HEADERS: object = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res: string): Void {
  getBody(res, true, function (err: boolean, body: string) {
    if (err) throw err

    var block: string = /ngx_http_status_lines\[] = {([^}]+)};/m.exec(body)[1]
    var codes: object = {}
    var match: object
    var regexp: RegExp = /ngx_string\("([0-9]+) ([^"]+)"\)/g

    while ((match = regexp.exec(block))) {
      codes[match[1]] = match[2]
    }

    write(path.join(__dirname, '../src/nginx.json'), codes)
  })
})
