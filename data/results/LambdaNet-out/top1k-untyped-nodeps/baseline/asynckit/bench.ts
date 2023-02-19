/* eslint no-console: "off" */

var asynckit: string = require('./')
  , async: any[]    = require('async')
  , assert: string   = require('assert')
  , expected: number = 0
  ;

var Benchmark: any[] = require('benchmark');
var suite: HTMLElement = new Benchmark.Suite;

var source: any[] = [];
for (var z = 1; z < 100; z++)
{
  source.push(z);
  expected += z;
}

suite
// add tests

.add('async.map', function(deferred: any[])
{
  var total: number = 0;

  async.map(source,
  function(i: string, cb: Function)
  {
    setImmediate(function()
    {
      total += i;
      cb(null, total);
    });
  },
  function(err: string, result: any[])
  {
    assert.ifError(err);
    assert.equal(result[result.length - 1], expected);
    deferred.resolve();
  });
}, {'defer': true})


.add('asynckit.parallel', function(deferred: any[])
{
  var total: number = 0;

  asynckit.parallel(source,
  function(i: string, cb: Function)
  {
    setImmediate(function()
    {
      total += i;
      cb(null, total);
    });
  },
  function(err: string, result: any[])
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
