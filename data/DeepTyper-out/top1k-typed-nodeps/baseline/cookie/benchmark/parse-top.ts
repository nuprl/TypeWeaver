/**
 * Module dependencies.
 */

var benchmark: any = require('benchmark')
var benchmarks: any = require('beautify-benchmark')
var top: any = require('./parse-top.json')

/**
  * Globals for benchmark.js
  */

global.cookie = require('..')

var suite: any = new benchmark.Suite()

Object.keys(top).forEach(function (domain: string) {
  suite.add({
    name: 'parse ' + domain,
    minSamples: 100,
    fn: 'var val = cookie.parse(' + JSON.stringify(top[domain]) + ')'
  })
})

suite.on('start', function onCycle (event: any): void {
  process.stdout.write('  cookie.parse - top sites\n\n')
})

suite.on('cycle', function onCycle (event: any): void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): void {
  benchmarks.log()
})

suite.run({async: false})

function gencookies (num: number): void {
  var str: string = ''

  for (var i = 0; i < num; i++) {
    str += '; foo' + i + '=bar'
  }

  return str.slice(2)
}
