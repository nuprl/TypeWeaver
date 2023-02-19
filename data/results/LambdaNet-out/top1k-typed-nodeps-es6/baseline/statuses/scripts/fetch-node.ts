'use strict'

import getBody from 'raw-body';
import https from 'https';
import path from 'path';
import write from './lib/write';

var URL: string = 'https://raw.githubusercontent.com/nodejs/node/master/lib/_http_server.js'
var HEADERS: object = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res: Function): void {
  getBody(res, true, function (err: boolean, body: string) {
    if (err) throw err

    var block: string = /STATUS_CODES\s*=\s*{([^}]+)};/m.exec(body)[1]
    var codes: object = {}
    var match: object
    var regexp: RegExp = /([0-9]+): '([^\\']*(?:\\'[^\\']*)*)'/g

    while ((match = regexp.exec(block))) {
      codes[match[1]] = match[2].replace(/\\'/g, "'")
    }

    write(path.join(__dirname, '../src/node.json'), codes)
  })
})
