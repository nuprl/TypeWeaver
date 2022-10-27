'use strict'

var getBody: any = require('raw-body')
var https: any = require('https')
var path: any = require('path')
var write: any = require('./lib/write')

var URL: string = 'https://raw.githubusercontent.com/nodejs/node/master/lib/_http_server.js'
var HEADERS: any = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res: any): void {
  getBody(res, true, function (err: any, body: any) {
    if (err) throw err

    var block: any = /STATUS_CODES\s*=\s*{([^}]+)};/m.exec(body)[1]
    var codes: {} = {}
    var match: any
    var regexp: RegExp = /([0-9]+): '([^\\']*(?:\\'[^\\']*)*)'/g

    while ((match = regexp.exec(block))) {
      codes[match[1]] = match[2].replace(/\\'/g, "'")
    }

    write(path.join(__dirname, '../src/node.json'), codes)
  })
})
