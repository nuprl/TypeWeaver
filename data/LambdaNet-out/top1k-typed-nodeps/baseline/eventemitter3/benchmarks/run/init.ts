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

//
// This is used to prevent the functions below from being transformed into
// noops.
//
var emitter: Object;

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  emitter = new EventEmitter1();
}).add('EventEmitter2', function() {
  emitter = new EventEmitter2();
}).add('EventEmitter3@0.1.6', function() {
  emitter = new EventEmitter3();
}).add('EventEmitter3(master)', function() {
  emitter = new Master();
}).add('Drip', function() {
  emitter = new Drip();
}).add('fastemitter', function() {
  emitter = new FE();
}).add('event-emitter', function() {
  emitter = EE();
}).add('contra/emitter', function() {
  emitter = CE();
}).on('cycle', function cycle(e: HTMLElement): Void {
  console.log(e.target.toString());
}).on('complete', function completed(): Void {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
