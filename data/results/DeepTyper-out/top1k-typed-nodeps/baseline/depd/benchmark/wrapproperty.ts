
/**
 * Module dependencies.
 */

var benchmark: any = require('benchmark')
var benchmarks: any = require('beautify-benchmark')

/**
 * Globals for benchmark.js
 */

process.env.NO_DEPRECATION = 'my-lib'
global.mylib = require('../test/fixtures/libs/my')

var suite: any = new benchmark.Suite()

suite.add({
  name: 'property',
  minSamples: 100,
  fn: 'mylib.prop = mylib.prop'
})

suite.add({
  name: 'wrapped',
  minSamples: 100,
  fn: 'mylib.propa = mylib.propa'
})

suite.on('cycle', function onCycle (event: any): void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): void {
  benchmarks.log()
})

suite.run({ async: false })
