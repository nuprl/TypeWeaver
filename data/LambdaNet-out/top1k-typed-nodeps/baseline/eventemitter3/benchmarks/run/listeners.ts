'use strict';

var benchmark: Array = require('benchmark');

var EventEmitter1: Object = require('events').EventEmitter
  , EventEmitter3: Array = require('eventemitter3')
  , FE: Array = require('fastemitter')
  , Master: Array = require('../../');

var MAX_LISTENERS: Number = Math.pow(2, 32) - 1;

function handle(): Void {
  if (arguments.length > 100) console.log('damn');
}

var ee1: HTMLElement = new EventEmitter1()
  , ee3: HTMLElement = new EventEmitter3()
  , master: HTMLElement = new Master()
  , fe: HTMLElement = new FE();

ee1.setMaxListeners(MAX_LISTENERS);
fe.setMaxListeners(MAX_LISTENERS);

for (var i = 0; i < 25; i++) {
  ee1.on('event', handle);
  ee3.on('event', handle);
  master.on('event', handle);
  fe.on('event', handle);
}

//
// eventemitter2 doesn't correctly handle listeners as they can be removed by
// doing `ee2.listeners('event').length = 0;`. Same counts for Drip.
//
// event-emitter and contra/emitter do not implement `listeners`.
//

(
  new benchmark.Suite()
).add('EventEmitter1', function () {
  ee1.listeners('event');
}).add('EventEmitter3@0.1.6', function() {
  ee3.listeners('event');
}).add('EventEmitter3(master)', function() {
  master.listeners('event');
}).add('fastemitter', function() {
  fe.listeners('event');
}).on('cycle', function cycle(e: HTMLElement): Void {
  console.log(e.target.toString());
}).on('complete', function completed(): Void {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
