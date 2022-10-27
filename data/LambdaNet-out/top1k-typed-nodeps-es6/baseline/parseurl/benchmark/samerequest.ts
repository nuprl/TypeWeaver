
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

import benchmark from 'benchmark';

import benchmarks from 'beautify-benchmark';

var assertValues: String = 'assert.strictEqual(obj.pathname, "/foo/bar"); assert.strictEqual(obj.search, "?user=tj&pet=fluffy");'
var suite: HTMLElement = new benchmark.Suite()

suite.add({
  name: 'fasturl',
  minSamples: 100,
  fn: 'var obj = fasturl.parse(req.url);' + assertValues,
  setup: 'req = createReq(url)'
})

suite.add({
  name: 'nativeurl' + (global.nativeurl.URL ? ' - legacy' : ''),
  minSamples: 100,
  fn: 'var obj = nativeurl.parse(req.url);' + assertValues,
  setup: 'req = createReq(url)'
})

if (global.nativeurl.URL) {
  suite.add({
    name: 'nativeurl - whatwg',
    minSamples: 100,
    fn: 'var obj = new nativeurl.URL(req.url, "http://localhost");' + assertValues,
    setup: 'req = createReq(url)'
  })
}

suite.add({
  name: 'parseurl',
  minSamples: 100,
  fn: 'var obj = parseurl(req);' + assertValues,
  setup: 'req = createReq(url)'
})

suite.on('start', function onCycle (event: String): Void {
  process.stdout.write('  Parsing URL ' + JSON.stringify(global.url) + ' on same request object\n\n')
})

suite.on('cycle', function onCycle (event: Object): Void {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete (): Void {
  benchmarks.log()
})

suite.run({ async: false })

function createReq (url: String): Object {
  return {
    url: url
  }
}
