
/**
 * Module dependencies.
 */

var benchmark: any = require('benchmark')
var benchmarks: any = require('beautify-benchmark')

/**
 * Globals for benchmark.js
 */

global.vary = require('..')

var suite: any = new benchmark.Suite()

suite.add({
  name: 'field to *',
  minSamples: 100,
  fn: 'var header = vary.append("*", "Accept-Encoding")'
})

suite.add({
  name: '* to field',
  minSamples: 100,
  fn: 'var header = vary.append("Accept-Encoding", "*")'
})

suite.add({
  name: 'field to empty',
  minSamples: 100,
  fn: 'var header = vary.append("", "Accept-Encoding")'
})

suite.add({
  name: 'fields array to empty',
  minSamples: 100,
  fn: 'var header = vary.append("", ["Accept", "Accept-Encoding", "Accept-Language"])'
})

suite.add({
  name: 'fields string to empty',
  minSamples: 100,
  fn: 'var header = vary.append("", "Accept, Accept-Encoding, Accept-Language")'
})

suite.add({
  name: 'field to fields',
  minSamples: 100,
  fn: 'var header = vary.append("Accept, Accept-Encoding, Accept-Language", "X-Foo")'
})

suite.on('start', function onCycle (event: any): void {
  process.stdout.write('  append\n\n')
})

suite.on('cycle', function onCycle (event: any): void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): void {
  benchmarks.log()
})

suite.run({ async: false })
