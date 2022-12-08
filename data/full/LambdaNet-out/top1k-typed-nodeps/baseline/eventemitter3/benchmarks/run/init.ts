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

//
// This is used to prevent the functions below from being transformed into
// noops.
//
var emitter: object;

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
}).on('cycle', function cycle(e: HTMLElement): void {
  console.log(e.target.toString());
}).on('complete', function completed(): void {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
