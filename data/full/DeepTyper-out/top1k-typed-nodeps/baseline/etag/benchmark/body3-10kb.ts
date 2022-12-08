
/**
 * Module dependencies.
 */

var benchmark: any = require('benchmark')
var benchmarks: any = require('beautify-benchmark')
var Buffer: any = require('safe-buffer').Buffer
var seedrandom: any = require('seedrandom')

/**
 * Globals for benchmark.js
 */

global.buffer = getbuffer(10 * 1000)
global.etag = require('..')
global.string = getbuffer(10 * 1000).toString()

var suite: any = new benchmark.Suite()

suite.add({
  name: 'buffer - strong',
  minSamples: 100,
  fn: 'var val = etag(buffer, {weak: false})'
})

suite.add({
  name: 'buffer - weak',
  minSamples: 100,
  fn: 'var val = etag(buffer, {weak: true})'
})

suite.add({
  name: 'string - strong',
  minSamples: 100,
  fn: 'var val = etag(string, {weak: false})'
})

suite.add({
  name: 'string - weak',
  minSamples: 100,
  fn: 'var val = etag(string, {weak: true})'
})

suite.on('start', function onCycle (event: any): void {
  process.stdout.write('  10KB body\n\n')
})

suite.on('cycle', function onCycle (event: any): void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): void {
  benchmarks.log()
})

suite.run({ async: false })

function getbuffer (size: any): any {
  var buffer: any = Buffer.alloc(size)
  var rng: any = seedrandom('body ' + size)

  for (var i = 0; i < buffer.length; i++) {
    buffer[i] = (rng() * 94 + 32) | 0
  }

  return buffer
}
