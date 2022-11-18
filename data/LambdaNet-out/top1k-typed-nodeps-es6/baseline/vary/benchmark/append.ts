
/**
 * Module dependencies.
 */

import benchmark from 'benchmark';

import benchmarks from 'beautify-benchmark';

/**
 * Globals for benchmark.js
 */

global.vary = require('..')

var suite: HTMLElement = new benchmark.Suite()

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

suite.on('start', function onCycle (event: string): Void {
  process.stdout.write('  append\n\n')
})

suite.on('cycle', function onCycle (event: object): Void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): Void {
  benchmarks.log()
})

suite.run({ async: false })
