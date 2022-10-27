'use strict'

var getBody: Function = require('raw-body')
var https: String = require('https')
var path: String = require('path')
var write: Function = require('./lib/write')

var URL: String = 'https://raw.githubusercontent.com/nodejs/node/master/lib/_http_server.js'
var HEADERS: Object = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res: String): Void {
  getBody(res, true, function (err: Boolean, body: String) {
    if (err) throw err

    var block: String = /STATUS_CODES\s*=\s*{([^}]+)};/m.exec(body)[1]
    var codes: Object = {}
    var match: Object
    var regexp: RegExp = /([0-9]+): '([^\\']*(?:\\'[^\\']*)*)'/g

    while ((match = regexp.exec(block))) {
      codes[match[1]] = match[2].replace(/\\'/g, "'")
    }

    write(path.join(__dirname, '../src/node.json'), codes)
  })
})
