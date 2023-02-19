'use strict';

var benchmark: any[] = require('benchmark');

var EventEmitter2: object = require('eventemitter2').EventEmitter2
  , EventEmitter1: object = require('events').EventEmitter
  , EventEmitter3: any[] = require('eventemitter3')
  , CE: Function = require('contra/emitter')
  , EE: Function = require('event-emitter')
  , FE: any[] = require('fastemitter')
  , Master: any[] = require('../../');

function foo(): number {
  if (arguments.length > 100) console.log('damn');

  return 1;
}

function bar(): boolean {
  if (arguments.length > 100) console.log('damn');

  return false;
}

function baz(): boolean {
  if (arguments.length > 100) console.log('damn');

  return true;
}

var ee1: HTMLElement = new EventEmitter1()
  , ee2: HTMLElement = new EventEmitter2()
  , ee3: HTMLElement = new EventEmitter3()
  , master: HTMLElement = new Master()
  , fe: HTMLElement = new FE()
  , ce: HTMLElement = CE()
  , ee: HTMLElement = EE();

ce.on('foo', foo).on('foo', bar).on('foo', baz);
ee.on('foo', foo).on('foo', bar).on('foo', baz);
fe.on('foo', foo).on('foo', bar).on('foo', baz);
ee3.on('foo', foo).on('foo', bar).on('foo', baz);
ee2.on('foo', foo).on('foo', bar).on('foo', baz);
ee1.on('foo', foo).on('foo', bar).on('foo', baz);
master.on('foo', foo).on('foo', bar).on('foo', baz);

//
// Drip is omitted as it throws an error.
// Ref: https://github.com/qualiancy/drip/pull/4
//

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  ee1.emit('foo');
  ee1.emit('foo', 'bar');
  ee1.emit('foo', 'bar', 'baz');
  ee1.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter2', function() {
  ee2.emit('foo');
  ee2.emit('foo', 'bar');
  ee2.emit('foo', 'bar', 'baz');
  ee2.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter3@0.1.6', function() {
  ee3.emit('foo');
  ee3.emit('foo', 'bar');
  ee3.emit('foo', 'bar', 'baz');
  ee3.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter3(master)', function() {
  master.emit('foo');
  master.emit('foo', 'bar');
  master.emit('foo', 'bar', 'baz');
  master.emit('foo', 'bar', 'baz', 'boom');
}).add('fastemitter', function() {
  fe.emit('foo');
  fe.emit('foo', 'bar');
  fe.emit('foo', 'bar', 'baz');
  fe.emit('foo', 'bar', 'baz', 'boom');
}).add('event-emitter', function() {
  ee.emit('foo');
  ee.emit('foo', 'bar');
  ee.emit('foo', 'bar', 'baz');
  ee.emit('foo', 'bar', 'baz', 'boom');
}).add('contra/emitter', function() {
  ce.emit('foo');
  ce.emit('foo', 'bar');
  ce.emit('foo', 'bar', 'baz');
  ce.emit('foo', 'bar', 'baz', 'boom');
}).on('cycle', function cycle(e: HTMLElement): void {
  console.log(e.target.toString());
}).on('complete', function completed(): void {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
