'use strict';

import benchmark from 'benchmark';
import { EventEmitter2 } from 'eventemitter2';
import { EventEmitter as EventEmitter1 } from 'events';
import EventEmitter3 from 'eventemitter3';
import { EventEmitter as Drip } from 'drip';
import CE from 'contra/emitter';
import EE from 'event-emitter';
import Master from '../../';

function handle(): void {
  if (arguments.length > 100) console.log('damn');
}

var ee1: any = new EventEmitter1()
  , ee2 = new EventEmitter2()
  , ee3 = new EventEmitter3()
  , master = new Master()
  , drip = new Drip()
  , ce = CE()
  , ee = EE();

[ee1, ee2, ee3, master, drip, ee, ce].forEach(function ohai(emitter: any): void {
  emitter.on('foo', handle);

  //
  // We add and remove a listener to see if the event emitter implementation is
  // de-optimized because it deletes items from an object etc.
  //
  emitter.on('ohai', ohai);
  if (emitter.removeListener) emitter.removeListener('ohai', ohai);
  else if (emitter.off) emitter.off('ohai', ohai);
  else throw new Error('No proper remove implementation');
});

//
// FastEmitter is omitted as it throws an error.
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
}).add('Drip', function() {
  drip.emit('foo');
  drip.emit('foo', 'bar');
  drip.emit('foo', 'bar', 'baz');
  drip.emit('foo', 'bar', 'baz', 'boom');
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
}).on('cycle', function cycle(e: any): void {
  console.log(e.target.toString());
}).on('complete', function completed(): void {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
