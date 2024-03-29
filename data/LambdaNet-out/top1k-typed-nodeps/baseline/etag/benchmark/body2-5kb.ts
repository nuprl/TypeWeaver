
/**
 * Module dependencies.
 */

var benchmark: any[] = require('benchmark')
var benchmarks: any[] = require('beautify-benchmark')
var Buffer: HTMLElement = require('safe-buffer').Buffer
var seedrandom: Function = require('seedrandom')

/**
 * Globals for benchmark.js
 */

global.buffer = getbuffer(5 * 1000)
global.etag = require('..')
global.string = getbuffer(5 * 1000).toString()

var suite: HTMLElement = new benchmark.Suite()

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

suite.on('start', function onCycle (event: string): void {
  process.stdout.write('  5KB body\n\n')
})

suite.on('cycle', function onCycle (event: object): void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): void {
  benchmarks.log()
})

suite.run({ async: false })

function getbuffer (size: string): any[] {
  var buffer: any[] = Buffer.alloc(size)
  var rng: object = seedrandom('body ' + size)

  for (var i = 0; i < buffer.length; i++) {
    buffer[i] = (rng() * 94 + 32) | 0
  }

  return buffer
}
