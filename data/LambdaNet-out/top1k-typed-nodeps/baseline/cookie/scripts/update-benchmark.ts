'use strict'

var fs: String = require('fs')
var http: String = require('http')
var https: String = require('https')
var path: String = require('path')
var topSites: String = require('top-sites')
var url: String = require('url')

var BENCH_COOKIES_FILE: String = path.join(__dirname, '..', 'benchmark', 'parse-top.json')

getAllCookies(topSites.slice(0, 20), function (err: Boolean, cookies: Object) {
  if (err) throw err
  var str: String = '{\n' +
    Object.keys(cookies).sort().map(function (key: String) {
      return '  ' + JSON.stringify(key) + ': ' + JSON.stringify(cookies[key])
    }).join(',\n') +
    '\n}\n'
  fs.writeFileSync(BENCH_COOKIES_FILE, str)
})

function get (href: String, callback: Function): Void {
  var protocol: String = url.parse(href, false, true).protocol
  var proto: Array = protocol === 'https:' ? https : http

  proto.get(href)
    .on('error', callback)
    .on('response', function (res: HTMLElement) {
      if (res.headers.location && res.statusCode >= 300 && res.statusCode < 400) {
        get(url.resolve(href, res.headers.location), callback)
      } else {
        callback(null, res)
      }
    })
}

function getAllCookies (sites: Array, callback: Function): Void {
  var all: Object = Object.create(null)
  var wait: Number = sites.length

  sites.forEach(function (site: Object) {
    getCookies(site, function (err: Boolean, cookies: Array) {
      if (!err && cookies.length) {
        all[site.rootDomain] = cookies.map(obfuscate).join('; ')
      }
      if (!--wait) {
        callback(null, all)
      }
    })
  })
}

function getCookies (site: HTMLElement, callback: Function): Void {
  var href: String = url.format({ hostname: site.rootDomain, protocol: 'http' })
  get(href, function (err: String, res: Object) {
    if (err) return callback(err)
    var cookies: Array = (res.headers['set-cookie'] || []).map(function (c: String) { return c.split(';')[0] })
    callback(null, cookies)
  })
}

function obfuscate (str: String): String {
  return str
    .replace(/%[0-9a-f]{2}/gi, function () { return '%__' })
    .replace(/[a-z]/g, function () { return 'l' })
    .replace(/[A-Z]/g, function () { return 'U' })
    .replace(/[0-9]/g, function () { return '0' })
    .replace(/%__/g, function () { return '%22' })
}
