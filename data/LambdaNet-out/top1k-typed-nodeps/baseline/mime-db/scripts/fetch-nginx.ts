/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Convert these text files to JSON for browser usage.
 */

var getBody: Function = require('raw-body')
var https: String = require('https')
var writedb: Function = require('./lib/write-db')

/**
 * Mime types and associated extensions are stored in the form:
 *
 *   <type> <ext> <ext> <ext>;
 */
var TYPE_LINE_REGEXP: RegExp = /^\s*([\w-]+\/[\w+.-]+)((?:\s+[\w-]+)*);\s*$/gm

/**
 * URL for the mime.types file in the NGINX project source.
 *
 * This uses the Github.com mirror of the Mercurial repository
 * as the Mercurial web interface requires cookies.
 */
var URL: String = 'https://raw.githubusercontent.com/nginx/nginx/master/conf/mime.types'

get(URL, function onResponse (err: Boolean, body: String): Void {
  if (err) throw err

  var json: Object = {}
  var match: Object = null

  TYPE_LINE_REGEXP.index = 0

  while ((match = TYPE_LINE_REGEXP.exec(body))) {
    var mime: String = match[1]

    // parse the extensions
    var extensions: Array = (match[2] || '')
      .split(/\s+/)
      .filter(Boolean)
    var data: Array = json[mime] || (json[mime] = {})

    // append the extensions
    appendExtensions(data, extensions)
  }

  writedb('src/nginx-types.json', json)
})

/**
 * Append an extension to an object.
 */
function appendExtension (obj: Object, extension: String): Void {
  if (!obj.extensions) {
    obj.extensions = []
  }

  if (obj.extensions.indexOf(extension) === -1) {
    obj.extensions.push(extension)
  }
}

/**
 * Append extensions to an object.
 */
function appendExtensions (obj: String, extensions: Array): Void {
  if (extensions.length === 0) {
    return
  }

  for (var i = 0; i < extensions.length; i++) {
    var extension: String = extensions[i]

    // add extension to the type entry
    appendExtension(obj, extension)
  }
}

/**
 * Get HTTPS resource.
 */
function get (url: String, callback: Function): Void {
  https.get(url, function onResponse (res: HTMLElement): Void {
    if (res.statusCode !== 200) {
      callback(new Error('got status code ' + res.statusCode + ' from ' + URL))
    } else {
      getBody(res, true, callback)
    }
  })
}
