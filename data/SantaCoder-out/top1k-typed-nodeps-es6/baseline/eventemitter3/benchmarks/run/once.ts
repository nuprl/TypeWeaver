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

function handle() {
  if (arguments.length > 100) console.log('damn');
}

var ee1 = new EventEmitter1()
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
}).on('cycle', function cycle(e: SyntheticEvent<HTMLButtonElement>) {
  console.log(e.target.toString());
}).on('complete', function completed() {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });