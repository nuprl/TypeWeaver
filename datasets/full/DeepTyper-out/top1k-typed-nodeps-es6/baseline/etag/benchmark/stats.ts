
/**
 * Module dependencies.
 */

import benchmark from 'benchmark';

import benchmarks from 'beautify-benchmark';
import fs from 'fs';

/**
 * Globals for benchmark.js
 */

global.etag = require('..')
global.fakestat = getstat(false)
global.realstat = getstat(true)

var suite: any = new benchmark.Suite()

suite.add({
  name: 'real - strong',
  minSamples: 100,
  fn: 'var val = etag(realstat, {weak: false})'
})

suite.add({
  name: 'real - weak',
  minSamples: 100,
  fn: 'var val = etag(realstat, {weak: true})'
})

suite.add({
  name: 'fake - strong',
  minSamples: 100,
  fn: 'var val = etag(fakestat, {weak: false})'
})

suite.add({
  name: 'fake - weak',
  minSamples: 100,
  fn: 'var val = etag(fakestat, {weak: true})'
})

suite.on('start', function onCycle (event: any): void {
  process.stdout.write('  stat\n\n')
})

suite.on('cycle', function onCycle (event: any): void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): void {
  benchmarks.log()
})

suite.run({ async: false })

function getstat (real: number): any {
  if (real) {
    return fs.statSync(__filename)
  }

  return {
    ctime: new Date('2014-09-01T14:52:07Z'),
    mtime: new Date('2014-09-01T14:52:07Z'),
    ino: 0,
    size: 3027
  }
}
