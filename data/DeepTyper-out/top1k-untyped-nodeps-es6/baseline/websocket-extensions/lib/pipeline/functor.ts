'use strict';

import RingBuffer from './ring_buffer';

var Functor: void = function(session: any, method: string) {
  this._session = session;
  this._method  = method;
  this._queue   = new RingBuffer(Functor.QUEUE_SIZE);
  this._stopped = false;
  this.pending  = 0;
};

Functor.QUEUE_SIZE = 8;

Functor.prototype.call = function(error: any, message: any, callback: any, context: any) {
  if (this._stopped) return;

  var record: any = { error: error, message: message, callback: callback, context: context, done: false },
      called = false,
      self   = this;

  this._queue.push(record);

  if (record.error) {
    record.done = true;
    this._stop();
    return this._flushQueue();
  }

  var handler: void = function(err: Error, msg: any) {
    if (!(called ^ (called = true))) return;

    if (err) {
      self._stop();
      record.error   = err;
      record.message = null;
    } else {
      record.message = msg;
    }

    record.done = true;
    self._flushQueue();
  };

  try {
    this._session[this._method](message, handler);
  } catch (err) {
    handler(err);
  }
};

Functor.prototype._stop = function() {
  this.pending  = this._queue.length;
  this._stopped = true;
};

Functor.prototype._flushQueue = function() {
  var queue: any = this._queue, record;

  while (queue.length > 0 && queue.peek().done) {
    record = queue.shift();
    if (record.error) {
      this.pending = 0;
      queue.clear();
    } else {
      this.pending -= 1;
    }
    record.callback.call(record.context, record.error, record.message);
  }
};

export default Functor;
