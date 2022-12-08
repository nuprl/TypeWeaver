'use strict'

import getBody from 'raw-body';
import https from 'https';
import path from 'path';
import write from './lib/write';

var URL = 'https://hg.nginx.org/nginx/raw-file/default/src/http/ngx_http_header_filter_module.c'
var HEADERS = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res) {
  getBody(res, true, function (err, body) {
    if (err) throw err

    var block = /ngx_http_status_lines\[] = {([^}]+)};/m.exec(body)[1]
    var codes = {}
    var match
    var regexp = /ngx_string\("([0-9]+) ([^"]+)"\)/g

    while ((match = regexp.exec(block))) {
      codes[match[1]] = match[2]
    }

    write(path.join(__dirname, '../src/nginx.json'), codes)
  })
})
