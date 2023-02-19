'use strict'

var getBody: any = require('raw-body')
var https: any = require('https')
var path: any = require('path')
var write: any = require('./lib/write')

var URL: string = 'https://hg.nginx.org/nginx/raw-file/default/src/http/ngx_http_header_filter_module.c'
var HEADERS: any = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res: any): void {
  getBody(res, true, function (err: any, body: any) {
    if (err) throw err

    var block: any = /ngx_http_status_lines\[] = {([^}]+)};/m.exec(body)[1]
    var codes: {} = {}
    var match: any
    var regexp: RegExp = /ngx_string\("([0-9]+) ([^"]+)"\)/g

    while ((match = regexp.exec(block))) {
      codes[match[1]] = match[2]
    }

    write(path.join(__dirname, '../src/nginx.json'), codes)
  })
})
