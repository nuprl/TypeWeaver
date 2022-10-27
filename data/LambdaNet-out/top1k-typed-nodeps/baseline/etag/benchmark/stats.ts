
/**
 * Module dependencies.
 */

var benchmark: Array = require('benchmark')
var benchmarks: Array = require('beautify-benchmark')
var fs: String = require('fs')

/**
 * Globals for benchmark.js
 */

global.etag = require('..')
global.fakestat = getstat(false)
global.realstat = getstat(true)

var suite: HTMLElement = new benchmark.Suite()

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

suite.on('start', function onCycle (event: String): Void {
  process.stdout.write('  stat\n\n')
})

suite.on('cycle', function onCycle (event: Object): Void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): Void {
  benchmarks.log()
})

suite.run({ async: false })

function getstat (real: Boolean): String {
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
