/* eslint no-console: "off" */

var asynckit: any = require('./')
  , async    = require('async')
  , assert   = require('assert')
  , expected = 0
  ;

import Benchmark from 'benchmark';
var suite: any = new Benchmark.Suite;

var source: any[] = [];
for (var z = 1; z < 100; z++)
{
  source.push(z);
  expected += z;
}

suite
// add tests

.add('async.map', function(deferred: any)
{
  var total: number = 0;

  async.map(source,
  function(i: number, cb: any)
  {
    setImmediate(function()
    {
      total += i;
      cb(null, total);
    });
  },
  function(err: any, result: any)
  {
    assert.ifError(err);
    assert.equal(result[result.length - 1], expected);
    deferred.resolve();
  });
}, {'defer': true})


.add('asynckit.parallel', function(deferred: any)
{
  var total: number = 0;

  asynckit.parallel(source,
  function(i: number, cb: void)
  {
    setImmediate(function()
    {
      total += i;
      cb(null, total);
    });
  },
  function(err: any, result: any)
  {
    assert.ifError(err);
    assert.equal(result[result.length - 1], expected);
    deferred.resolve();
  });
}, {'defer': true})


// add listeners
.on('cycle', function(ev: any)
{
  console.log(String(ev.target));
})
.on('complete', function()
{
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
