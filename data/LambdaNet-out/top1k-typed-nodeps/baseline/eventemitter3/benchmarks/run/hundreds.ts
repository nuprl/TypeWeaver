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

function foo(): number {
  if (arguments.length > 100) console.log('damn');

  return 1;
}

var ee1: HTMLElement = new EventEmitter1()
  , ee2: HTMLElement = new EventEmitter2()
  , ee3: HTMLElement = new EventEmitter3()
  , master: HTMLElement = new Master()
  , drip: HTMLElement = new Drip()
  , fe: HTMLElement = new FE()
  , ce: HTMLElement = CE()
  , ee: HTMLElement = EE()
  , j: number, i: number;

for (i = 0; i < 10; i++) {
  for (j = 0; j < 10; j++) {
    ce.on('event:' + i, foo);
    ee.on('event:' + i, foo);
    fe.on('event:' + i, foo);
    ee1.on('event:' + i, foo);
    ee2.on('event:' + i, foo);
    ee3.on('event:' + i, foo);
    drip.on('event:' + i, foo);
    master.on('event:' + i, foo);
  }
}

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  for (i = 0; i < 10; i++) {
    ee1.emit('event:' + i);
  }
}).add('EventEmitter2', function() {
  for (i = 0; i < 10; i++) {
    ee2.emit('event:' + i);
  }
}).add('EventEmitter3@0.1.6', function() {
  for (i = 0; i < 10; i++) {
    ee3.emit('event:' + i);
  }
}).add('EventEmitter3(master)', function() {
  for (i = 0; i < 10; i++) {
    master.emit('event:' + i);
  }
}).add('Drip', function() {
  for (i = 0; i < 10; i++) {
    drip.emit('event:' + i);
  }
}).add('fastemitter', function() {
  for (i = 0; i < 10; i++) {
    fe.emit('event:' + i);
  }
}).add('event-emitter', function() {
  for (i = 0; i < 10; i++) {
    ee.emit('event:' + i);
  }
}).add('contra/emitter', function() {
  for (i = 0; i < 10; i++) {
    ce.emit('event:' + i);
  }
}).on('cycle', function cycle(e: HTMLElement): void {
  console.log(e.target.toString());
}).on('complete', function completed(): void {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
