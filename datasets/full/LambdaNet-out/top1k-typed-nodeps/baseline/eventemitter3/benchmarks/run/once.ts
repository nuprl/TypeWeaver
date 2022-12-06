'use strict';

var benchmark: any[] = require('benchmark');

var EventEmitter2: object = require('eventemitter2').EventEmitter2
  , EventEmitter1: object = require('events').EventEmitter
  , EventEmitter3: any[] = require('eventemitter3')
  , Drip: object = require('drip').EventEmitter
  , CE: Function = require('contra/emitter')
  , EE: Function = require('event-emitter')
  , FE: any[] = require('fastemitter')
  , Master: any[] = require('../../');

function handle(): void {
  if (arguments.length > 100) console.log('damn');
}

var ee1: HTMLElement = new EventEmitter1()
  , ee2: HTMLElement = new EventEmitter2()
  , ee3: HTMLElement = new EventEmitter3()
  , master: HTMLElement = new Master()
  , drip: HTMLElement = new Drip()
  , fe: HTMLElement = new FE()
  , ce: object = CE()
  , ee: object = EE();

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
}).on('cycle', function cycle(e: HTMLElement): void {
  console.log(e.target.toString());
}).on('complete', function completed(): void {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
