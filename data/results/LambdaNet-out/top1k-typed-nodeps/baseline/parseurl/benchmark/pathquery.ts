
/**
 * Globals for benchmark.js
 */

global.assert = require('assert')
global.createReq = createReq
global.fasturl = require('fast-url-parser')
global.nativeurl = require('url')
global.parseurl = require('..')
global.url = '/foo/bar?user=tj&pet=fluffy'

/**
 * Module dependencies.
 */

var benchmark: any[] = require('benchmark')
var benchmarks: any[] = require('beautify-benchmark')

var assertValues: string = 'assert.strictEqual(obj.pathname, "/foo/bar"); assert.strictEqual(obj.search, "?user=tj&pet=fluffy");'
var suite: HTMLElement = new benchmark.Suite()

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
    fn: 'var obj = new nativeurl.URL(createReq(url).url, "http://localhost");' + assertValues
  })
}

suite.add({
  name: 'parseurl',
  minSamples: 100,
  fn: 'var obj = parseurl(createReq(url));' + assertValues
})

suite.on('start', function onCycle (event: string): void {
  process.stdout.write('  Parsing URL ' + JSON.stringify(global.url) + '\n\n')
})

suite.on('cycle', function onCycle (event: object): void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): void {
  benchmarks.log()
})

suite.run({ async: false })

function createReq (url: string): object {
  return {
    url: url
  }
}
