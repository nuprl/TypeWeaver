/* eslint no-console: "off" */

var asynckit: String = require('./')
  , async: Array    = require('async')
  , assert: String   = require('assert')
  , expected: Number = 0
  ;

var Benchmark: Array = require('benchmark');
var suite: HTMLElement = new Benchmark.Suite;

var source: Array = [];
for (var z = 1; z < 100; z++)
{
  source.push(z);
  expected += z;
}

suite
// add tests

.add('async.map', function(deferred: Array)
{
  var total: Number = 0;

  async.map(source,
  function(i: String, cb: Function)
  {
    setImmediate(function()
    {
      total += i;
      cb(null, total);
    });
  },
  function(err: String, result: Array)
  {
    assert.ifError(err);
    assert.equal(result[result.length - 1], expected);
    deferred.resolve();
  });
}, {'defer': true})


.add('asynckit.parallel', function(deferred: Array)
{
  var total: Number = 0;

  asynckit.parallel(source,
  function(i: String, cb: Function)
  {
    setImmediate(function()
    {
      total += i;
      cb(null, total);
    });
  },
  function(err: String, result: Array)
  {
    assert.ifError(err);
    assert.equal(result[result.length - 1], expected);
    deferred.resolve();
  });
}, {'defer': true})


// add listeners
.on('cycle', function(ev: HTMLElement)
{
  console.log(String(ev.target));
})
.on('complete', function()
{
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
