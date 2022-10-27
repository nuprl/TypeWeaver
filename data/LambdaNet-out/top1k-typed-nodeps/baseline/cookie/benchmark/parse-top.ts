/**
 * Module dependencies.
 */

var benchmark: Array = require('benchmark')
var benchmarks: Array = require('beautify-benchmark')
var top: Object = require('./parse-top.json')

/**
  * Globals for benchmark.js
  */

global.cookie = require('..')

var suite: HTMLElement = new benchmark.Suite()

Object.keys(top).forEach(function (domain: String) {
  suite.add({
    name: 'parse ' + domain,
    minSamples: 100,
    fn: 'var val = cookie.parse(' + JSON.stringify(top[domain]) + ')'
  })
})

suite.on('start', function onCycle (event: String): Void {
  process.stdout.write('  cookie.parse - top sites\n\n')
})

suite.on('cycle', function onCycle (event: Object): Void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): Void {
  benchmarks.log()
})

suite.run({async: false})

function gencookies (num: String): String {
  var str: String = ''

  for (var i = 0; i < num; i++) {
    str += '; foo' + i + '=bar'
  }

  return str.slice(2)
}
