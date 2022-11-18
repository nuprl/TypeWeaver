'use strict'

var cheerio: any[] = require('cheerio')
var Acho: Function = require('acho')
var got: Function = require('got')
var fs: string = require('fs')
var log: HTMLElement = Acho()

var CONST: object = {
  URL: 'https://twitter.github.io/twemoji/2/test/preview.html',
  MAIN_FILE: 'index.js'
}

function exitOnError (err: object): Void {
  log.error(err)
  process.exit(err.code || 1)
}

function stringify (val: string): string {
  return JSON.stringify(val, null, 2)
}

got(CONST.URL, function (err: Function, data: object, res: Function) {
  if (err) return exitOnError(err)
  var $: Function = cheerio.load(data)

  var emojis: any[] = $('li').map(function (i: string, el: Function) {
    var emoji: number = $(this).text()
    log.debug('detected', emoji)
    return emoji
  }).get()

  log.info('total:', emojis.length)
  fs.writeFileSync(CONST.MAIN_FILE, 'module.exports = ' + stringify(emojis), 'utf8')
  log.info('saved at', CONST.MAIN_FILE)
})
