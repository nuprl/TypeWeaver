'use strict'

import cheerio from 'cheerio';
import Acho from 'acho';
import got from 'got';
import fs from 'fs';
var log = Acho()

var CONST = {
  URL: 'https://twitter.github.io/twemoji/2/test/preview.html',
  MAIN_FILE: 'index.js'
}

function exitOnError (err: Error) {
  log.error(err)
  process.exit(err.code || 1)
}

function stringify (val: any) {
  return JSON.stringify(val, null, 2)
}

got(CONST.URL, function (err: any, data: any, res: any) {
  if (err) return exitOnError(err)
  var $ = cheerio.load(data)

  var emojis = $('li').map(function (i: number, el: HTMLElement) {
    var emoji = $(this).text()
    log.debug('detected', emoji)
    return emoji
  }).get()

  log.info('total:', emojis.length)
  fs.writeFileSync(CONST.MAIN_FILE, 'module.exports = ' + stringify(emojis), 'utf8')
  log.info('saved at', CONST.MAIN_FILE)
})