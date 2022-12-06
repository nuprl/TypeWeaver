
/**
 * Globals for benchmark.js
 */
global.escapeHtml = require('..')

/**
 * Module dependencies.
 */
var benchmark: any = require('benchmark')
var benchmarks: any = require('beautify-benchmark')

for (var dep in process.versions) {
  console.log('  %s@%s', dep, process.versions[dep])
}

console.log('')

var suite: any = new benchmark.Suite()

suite.add({
  'name': 'no special characters',
  'minSamples': 100,
  'fn': 'escapeHtml(str)',
  'setup': 'str = "Hello, World!"'
})

suite.add({
  'name': 'single special character',
  'minSamples': 100,
  'fn': 'escapeHtml(str)',
  'setup': 'str = "Hello, World&!"'
})

suite.add({
  'name': 'many special characters',
  'minSamples': 100,
  'fn': 'escapeHtml(str)',
  'setup': 'str = "\'>\'\\"\\"&>h<e>&<y>"'
})

suite.on('cycle', function onCycle (event: any): void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): void {
  benchmarks.log()
})

suite.run({ 'async': false })
