'use strict'

var fs: any = require('fs')
var http: any = require('http')
var https: any = require('https')
var path: any = require('path')
var topSites: any = require('top-sites')
var url: any = require('url')

var BENCH_COOKIES_FILE: string = path.join(__dirname, '..', 'benchmark', 'parse-top.json')

getAllCookies(topSites.slice(0, 20), function (err: any, cookies: any) {
  if (err) throw err
  var str: string = '{\n' +
    Object.keys(cookies).sort().map(function (key: string) {
      return '  ' + JSON.stringify(key) + ': ' + JSON.stringify(cookies[key])
    }).join(',\n') +
    '\n}\n'
  fs.writeFileSync(BENCH_COOKIES_FILE, str)
})

function get (href: string, callback: any) {
  var protocol: any = url.parse(href, false, true).protocol
  var proto: any = protocol === 'https:' ? https : http

  proto.get(href)
    .on('error', callback)
    .on('response', function (res: any) {
      if (res.headers.location && res.statusCode >= 300 && res.statusCode < 400) {
        get(url.resolve(href, res.headers.location), callback)
      } else {
        callback(null, res)
      }
    })
}

function getAllCookies (sites: string, callback: Function): void {
  var all: any = Object.create(null)
  var wait: any = sites.length

  sites.forEach(function (site: any) {
    getCookies(site, function (err: any, cookies: any) {
      if (!err && cookies.length) {
        all[site.rootDomain] = cookies.map(obfuscate).join('; ')
      }
      if (!--wait) {
        callback(null, all)
      }
    })
  })
}

function getCookies (site: string, callback: Function): void {
  var href: string = url.format({ hostname: site.rootDomain, protocol: 'http' })
  get(href, function (err: any, res: any) {
    if (err) return callback(err)
    var cookies: any = (res.headers['set-cookie'] || []).map(function (c: string) { return c.split(';')[0] })
    callback(null, cookies)
  })
}

function obfuscate (str: string): string {
  return str
    .replace(/%[0-9a-f]{2}/gi, function () { return '%__' })
    .replace(/[a-z]/g, function () { return 'l' })
    .replace(/[A-Z]/g, function () { return 'U' })
    .replace(/[0-9]/g, function () { return '0' })
    .replace(/%__/g, function () { return '%22' })
}
