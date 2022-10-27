'use strict';

var benchmark: Array = require('benchmark');

var EventEmitter2: Object = require('eventemitter2').EventEmitter2
  , EventEmitter1: Object = require('events').EventEmitter
  , EventEmitter3: Array = require('eventemitter3')
  , Drip: Object = require('drip').EventEmitter
  , CE: Function = require('contra/emitter')
  , EE: Function = require('event-emitter')
  , FE: Array = require('fastemitter')
  , Master: Array = require('../../');

function handle(): Void {
  if (arguments.length > 100) console.log('damn');
}

var ee1: HTMLElement = new EventEmitter1()
  , ee2: HTMLElement = new EventEmitter2()
  , ee3: HTMLElement = new EventEmitter3()
  , master: HTMLElement = new Master()
  , drip: HTMLElement = new Drip()
  , fe: HTMLElement = new FE()
  , ce: HTMLElement = CE()
  , ee: Object = EE();

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  ee1.once('foo', handle).emit('foo');
}).add('EventEmitter2', function() {
  ee2.once('foo', handle).emit('foo');
}).add('EventEmitter3@0.1.6', function() {
  ee3.once('foo', handle).emit('foo');
}).add('EventEmitter3(master)', function() {
  master.once('foo', handle).emit('foo');
}).add('Drip', function() {
  drip.once('foo', handle).emit('foo');
}).add('fastemitter', function() {
  fe.once('foo', handle).emit('foo');
}).add('event-emitter', function() {
  ee.once('foo', handle).emit('foo');
}).add('contra/emitter', function() {
  ce.once('foo', handle).emit('foo');
}).on('cycle', function cycle(e: HTMLElement): Void {
  console.log(e.target.toString());
}).on('complete', function completed(): Void {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
