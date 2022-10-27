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

function handle(): void {
  if (arguments.length > 100) console.log('damn');
}

var ee1: any = new EventEmitter1()
  , ee2 = new EventEmitter2()
  , ee3 = new EventEmitter3()
  , master = new Master()
  , drip = new Drip()
  , fe = new FE()
  , ce = CE()
  , ee = EE();

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
}).on('cycle', function cycle(e: any): void {
  console.log(e.target.toString());
}).on('complete', function completed(): void {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
