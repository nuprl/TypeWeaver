
/**
 * Module dependencies.
 */

var benchmark: Array = require('benchmark')
var benchmarks: Array = require('beautify-benchmark')

/**
 * Globals for benchmark.js
 */

process.env.NO_DEPRECATION = 'my-lib'
global.mylib = require('../test/fixtures/libs/my')

var suite: HTMLElement = new benchmark.Suite()

suite.add({
  name: 'function',
  minSamples: 100,
  fn: 'mylib.fn()'
})

suite.add({
  name: 'wrapped',
  minSamples: 100,
  fn: 'mylib.oldfn()'
})

suite.add({
  name: 'call log',
  minSamples: 100,
  fn: 'mylib.old()'
})

suite.on('cycle', function onCycle (event: Object): Void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): Void {
  benchmarks.log()
})

suite.run({ async: false })