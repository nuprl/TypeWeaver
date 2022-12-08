'use strict';

import benchmark from 'benchmark';
import { EventEmitter2 } from 'eventemitter2';
import { EventEmitter as EventEmitter1 } from 'events';
import EventEmitter3 from 'eventemitter3';
import { EventEmitter as Drip } from 'drip';
import CE from 'contra/emitter';
import EE from 'event-emitter';
import FE from 'fastemitter';
import Master from '../../';

//
// This is used to prevent the functions below from being transformed into
// noops.
//
var emitter: any;

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
}).on('cycle', function cycle(e: any): void {
  console.log(e.target.toString());
}).on('complete', function completed(): void {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
