/**
 * Module dependencies.
 */

import benchmark from 'benchmark';

import benchmarks from 'beautify-benchmark';

/**
 * Globals for benchmark.js
 */

global.cookie = require('..')

var suite = new benchmark.Suite()

suite.add({
  name: 'simple',
  minSamples: 100,
  fn: 'var val = cookie.parse("foo=bar")'
})

suite.add({
  name: 'decode',
  minSamples: 100,
  fn: 'var val = cookie.parse("foo=hello%20there!")'
})

suite.add({
  name: 'unquote',
  minSamples: 100,
  fn: 'var val = cookie.parse("foo=\\"foo bar\\"")'
})

suite.add({
  name: 'duplicates',
  minSamples: 100,
  fn: 'var val = cookie.parse(' + JSON.stringify(gencookies(2) + '; ' + gencookies(2)) + ')'
})

suite.add({
  name: '10 cookies',
  minSamples: 100,
  fn: 'var val = cookie.parse(' + JSON.stringify(gencookies(10)) + ')'
})

suite.add({
  name: '100 cookies',
  minSamples: 100,
  fn: 'var val = cookie.parse(' + JSON.stringify(gencookies(100)) + ')'
})

suite.on('start', function onCycle (event: Event) {
  process.stdout.write('  cookie.parse - generic\n\n')
})

suite.on('cycle', function onCycle (event: BenchmarkEvent) {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete () {
  benchmarks.log()
})

suite.run({async: false})

function gencookies (num: number) {
  var str = ''

  for (var i = 0; i < num; i++) {
    str += '; foo' + i + '=bar'
  }

  return str.slice(2)
}