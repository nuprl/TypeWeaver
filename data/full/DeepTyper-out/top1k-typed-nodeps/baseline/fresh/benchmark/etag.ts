
/**
 * Module dependencies.
 */

var benchmark: any = require('benchmark')
var benchmarks: any = require('beautify-benchmark')

/**
 * Globals for benchmark.js
 */

global.fresh = require('..')

var suite: any = new benchmark.Suite()

suite.add({
  name: 'star',
  minSamples: 100,
  fn: 'var val = fresh({ \'if-none-match\': \'*\' }, { etag: \'"foo"\' })'
})

suite.add({
  name: 'single etag',
  minSamples: 100,
  fn: 'var val = fresh({ \'if-none-match\': \'"foo"\' }, { etag: \'"foo"\' })'
})

suite.add({
  name: 'several etags',
  minSamples: 100,
  fn: 'var val = fresh({ \'if-none-match\': \'"foo", "bar", "fizz", "buzz"\' }, { etag: \'"buzz"\' })'
})

suite.on('start', function onCycle (event: any): void {
  process.stdout.write('  etag\n\n')
})

suite.on('cycle', function onCycle (event: any): void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): void {
  benchmarks.log()
})

suite.run({ async: false })
