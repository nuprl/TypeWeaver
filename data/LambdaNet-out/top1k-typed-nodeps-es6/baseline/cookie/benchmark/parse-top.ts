/**
 * Module dependencies.
 */

import benchmark from 'benchmark';

import benchmarks from 'beautify-benchmark';
import top from './parse-top.json';

/**
  * Globals for benchmark.js
  */

global.cookie = require('..')

var suite: HTMLElement = new benchmark.Suite()

Object.keys(top).forEach(function (domain: string) {
  suite.add({
    name: 'parse ' + domain,
    minSamples: 100,
    fn: 'var val = cookie.parse(' + JSON.stringify(top[domain]) + ')'
  })
})

suite.on('start', function onCycle (event: string): void {
  process.stdout.write('  cookie.parse - top sites\n\n')
})

suite.on('cycle', function onCycle (event: object): void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): void {
  benchmarks.log()
})

suite.run({async: false})

function gencookies (num: string): string {
  var str: string = ''

  for (var i = 0; i < num; i++) {
    str += '; foo' + i + '=bar'
  }

  return str.slice(2)
}
