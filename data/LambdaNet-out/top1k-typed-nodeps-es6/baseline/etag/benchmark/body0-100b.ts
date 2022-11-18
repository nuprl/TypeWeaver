
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

global.buffer = getbuffer(100)
global.etag = require('..')
global.string = getbuffer(100).toString()

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

suite.on('start', function onCycle (event: string): Void {
  process.stdout.write('  100B body\n\n')
})

suite.on('cycle', function onCycle (event: object): Void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): Void {
  benchmarks.log()
})

suite.run({ async: false })

function getbuffer (size: string): any[] {
  var buffer: HTMLElement = Buffer.alloc(size)
  var rng: Function = seedrandom('body ' + size)

  for (var i = 0; i < buffer.length; i++) {
    buffer[i] = (rng() * 94 + 32) | 0
  }

  return buffer
}
