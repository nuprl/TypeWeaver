
/**
 * Module dependencies.
 */

var benchmark: any[] = require('benchmark')
var benchmarks: any[] = require('beautify-benchmark')

/**
 * Globals for benchmark.js
 */

global.fresh = require('..')

var suite: HTMLElement = new benchmark.Suite()

suite.add({
  name: 'not modified',
  minSamples: 100,
  fn: 'var val = fresh({ \'if-modified-since\': \'Fri, 01 Jan 2010 00:00:00 GMT\' }, { \'last-modified\': \'Sat, 01 Jan 2000 00:00:00 GMT\' })'
})

suite.add({
  name: 'modified',
  minSamples: 100,
  fn: 'var val = fresh({ \'if-modified-since\': \'Mon, 01 Jan 1990 00:00:00 GMT\' }, { \'last-modified\': \'Sat, 01 Jan 2000 00:00:00 GMT\' })'
})

suite.on('start', function onCycle (event: string): void {
  process.stdout.write('  modified\n\n')
})

suite.on('cycle', function onCycle (event: object): void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): void {
  benchmarks.log()
})

suite.run({ async: false })
