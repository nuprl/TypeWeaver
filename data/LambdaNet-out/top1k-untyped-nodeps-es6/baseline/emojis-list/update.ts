'use strict'

import cheerio from 'cheerio';
import Acho from 'acho';
import got from 'got';
import fs from 'fs';
var log: HTMLElement = Acho()

var CONST: Object = {
  URL: 'https://twitter.github.io/twemoji/2/test/preview.html',
  MAIN_FILE: 'index.js'
}

function exitOnError (err: Object): Void {
  log.error(err)
  process.exit(err.code || 1)
}

function stringify (val: String): String {
  return JSON.stringify(val, null, 2)
}

got(CONST.URL, function (err: Function, data: Object, res: Function) {
  if (err) return exitOnError(err)
  var $: Function = cheerio.load(data)

  var emojis: Array = $('li').map(function (i: String, el: Function) {
    var emoji: Number = $(this).text()
    log.debug('detected', emoji)
    return emoji
  }).get()

  log.info('total:', emojis.length)
  fs.writeFileSync(CONST.MAIN_FILE, 'module.exports = ' + stringify(emojis), 'utf8')
  log.info('saved at', CONST.MAIN_FILE)
})
