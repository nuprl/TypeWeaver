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
  , ce: HTMLElement = CE()
  , ee: HTMLElement = EE();

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  ee1.on('foo', handle);
  ee1.removeListener('foo', handle);
}).add('EventEmitter2', function() {
  ee2.on('foo', handle);
  ee2.removeListener('foo', handle);
}).add('EventEmitter3@0.1.6', function() {
  ee3.on('foo', handle);
  ee3.removeListener('foo', handle);
}).add('EventEmitter3(master)', function() {
  master.on('foo', handle);
  master.removeListener('foo', handle);
}).add('Drip', function() {
  drip.on('foo', handle);
  drip.removeListener('foo', handle);
}).add('fastemitter', function() {
  fe.on('foo', handle);
  fe.removeListener('foo', handle);
}).add('event-emitter', function() {
  ee.on('foo', handle);
  ee.off('foo', handle);
}).add('contra/emitter', function() {
  ce.on('foo', handle);
  ce.off('foo', handle);
}).on('cycle', function cycle(e: HTMLElement): void {
  console.log(e.target.toString());
}).on('complete', function completed(): void {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
