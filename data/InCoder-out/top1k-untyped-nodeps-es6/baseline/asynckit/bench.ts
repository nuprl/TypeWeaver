/* eslint no-console: "off" */

import asynckit from './';

import async from 'async';
import assert from 'assert';
/* eslint no-console: "off" */

var expected = 0;

import Benchmark from 'benchmark';
var suite = new Benchmark.Suite;

var source = [];
for (var z = 1; z < 100; z++)
{
  source.push(z);
  expected += z;
}

suite
// add tests

.add('async.map', function(deferred: Q.Deferred)
{
  var total = 0;

  async.map(source,
  function(i: number,  cb: Function)
  {
    setImmediate(function()
    {
      total += i;
      cb(null, total);
    });
  },
  function(err: Error,  result: Object)
  {
    assert.ifError(err);
    assert.equal(result[result.length - 1], expected);
    deferred.resolve();
  });
}, {'defer': true})


.add('asynckit.parallel', function(deferred: Deferred)
{
  var total = 0;

  asynckit.parallel(source,
  function(i: number,  cb: Function)
  {
    setImmediate(function()
    {
      total += i;
      cb(null, total);
    });
  },
  function(err: Error,  result: Object)
  {
    assert.ifError(err);
    assert.equal(result[result.length - 1], expected);
    deferred.resolve();
  });
}, {'defer': true})


// add listeners
.on('cycle', function(ev: MouseEvent)
{
  console.log(String(ev.target));
})
.on('complete', function()
{
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });