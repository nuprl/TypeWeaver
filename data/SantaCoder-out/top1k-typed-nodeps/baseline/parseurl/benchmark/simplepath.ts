
/**
 * Globals for benchmark.js
 */

global.assert = require('assert')
global.createReq = createReq
global.fasturl = require('fast-url-parser')
global.nativeurl = require('url')
global.parseurl = require('..')
global.url = '/foo/bar'

/**
 * Module dependencies.
 */

var benchmark = require('benchmark')
var benchmarks = require('beautify-benchmark')

var assertValues = 'assert.strictEqual(obj.pathname, "/foo/bar"); assert.ok(!obj.search);'
var suite = new benchmark.Suite()

suite.add({
  name: 'fasturl',
  minSamples: 100,
  fn: 'var obj = fasturl.parse(createReq(url).url);' + assertValues
})

suite.add({
  name: 'nativeurl' + (global.nativeurl.URL ? ' - legacy' : ''),
  minSamples: 100,
  fn: 'var obj = nativeurl.parse(createReq(url).url);' + assertValues
})

if (global.nativeurl.URL) {
  suite.add({
    name: 'nativeurl - whatwg',
    minSamples: 100,
    fn: 'var obj = new nativeurl.URL(createReq(url).url, "http://localhost");' + assertValues,
    setup: 'req = createReq(url)'
  })
}

suite.add({
  name: 'parseurl',
  minSamples: 100,
  fn: 'var obj = parseurl(createReq(url));' + assertValues
})

suite.on('start', function onCycle (event: any) {
  process.stdout.write('  Parsing URL ' + JSON.stringify(global.url) + '\n\n')
})

suite.on('cycle', function onCycle (event: any) {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete () {
  benchmarks.log()
})

suite.run({ async: false })

function createReq (url: string) {
  return {
    url: url
  }
}