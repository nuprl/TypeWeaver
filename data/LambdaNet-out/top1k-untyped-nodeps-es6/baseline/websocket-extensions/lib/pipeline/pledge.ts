'use strict';

import RingBuffer from './ring_buffer';

var Pledge: Function = function() {
  this._complete  = false;
  this._callbacks = new RingBuffer(Pledge.QUEUE_SIZE);
};

Pledge.QUEUE_SIZE = 4;

Pledge.all = function(list: Array) {
  var pledge: Element  = new Pledge(),
      pending: Number = list.length,
      n: Number       = pending;

  if (pending === 0) pledge.done();

  while (n--) list[n].then(function() {
    pending -= 1;
    if (pending === 0) pledge.done();
  });
  return pledge;
};

Pledge.prototype.then = function(callback: Function) {
  if (this._complete) callback();
  else this._callbacks.push(callback);
};

Pledge.prototype.done = function() {
  this._complete = true;
  var callbacks: Array = this._callbacks, callback: Function;
  while (callback = callbacks.shift()) callback();
};

export default Pledge;
