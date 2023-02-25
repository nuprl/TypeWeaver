
/**
 * Module dependencies.
 */

import benchmark from 'benchmark';

import benchmarks from 'beautify-benchmark';
import { Buffer } from 'safe-buffer';
import seedrandom from 'seedrandom';

/**
 * Globals for benchmark.js
 */

global.buffer = getbuffer(1 * 1000)
global.etag = require('..')
global.string = getbuffer(1 * 1000).toString()

var suite = new benchmark.Suite()

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

suite.on('start', function onCycle (event: CycleEvent) {
  process.stdout.write('  1KB body\n\n')
})

suite.on('cycle', function onCycle (event: BenchmarkEvent) {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete () {
  benchmarks.log()
})

suite.run({ async: false })

function getbuffer (size: number) {
  var buffer = Buffer.alloc(size)
  var rng = seedrandom('body ' + size)

  for (var i = 0; i < buffer.length; i++) {
    buffer[i] = (rng() * 94 + 32) | 0
  }

  return buffer
}