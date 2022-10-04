'use strict'

import cheerio from 'cheerio';
import Acho from 'acho';
import got from 'got';
import fs from 'fs';
var log: any = Acho()

var CONST: any = {
  URL: 'https://twitter.github.io/twemoji/2/test/preview.html',
  MAIN_FILE: 'index.js'
}

function exitOnError (err: any): string {
  log.error(err)
  process.exit(err.code || 1)
}

function stringify (val: any): any {
  return JSON.stringify(val, null, 2)
}

got(CONST.URL, function (err: any, data: any, res: any) {
  if (err) return exitOnError(err)
  var $ = cheerio.load(data)

  var emojis: any = $('li').map(function (i: any, el: any) {
    var emoji: any = $(this).text()
    log.debug('detected', emoji)
    return emoji
  }).get()

  log.info('total:', emojis.length)
  fs.writeFileSync(CONST.MAIN_FILE, 'module.exports = ' + stringify(emojis), 'utf8')
  log.info('saved at', CONST.MAIN_FILE)
})
