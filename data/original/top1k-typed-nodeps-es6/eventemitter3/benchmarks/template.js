'use strict';

/**
 * Benchmark related modules.
 */
import benchmark from 'benchmark';

/**
 * Preparation code.
 */

(
  new benchmark.Suite()
).add('<test1>', function() {

}).add('<test2>', function() {

}).on('cycle', function cycle(e) {
  console.log(e.target.toString());
}).on('complete', function completed() {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
