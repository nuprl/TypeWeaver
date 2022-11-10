'use strict';

import Functor from './functor';
import Pledge from './pledge';

var Cell = function(tuple: Array<string>) {
  this._ext     = tuple[0];
  this._session = tuple[1];

  this._functors = {
    incoming: new Functor(this._session, 'processIncomingMessage'),
    outgoing: new Functor(this._session, 'processOutgoingMessage')
  };
};

Cell.prototype.pending = function(direction: any) {
  var functor = this._functors[direction];
  if (!functor._stopped) functor.pending += 1;
};

Cell.prototype.incoming = function(error: Error,  message: String,  callback: Function,  context: Object) {
  this._exec('incoming', error, message, callback, context);
};

Cell.prototype.outgoing = function(error: Error,  message: String,  callback: Function,  context: Object) {
  this._exec('outgoing', error, message, callback, context);
};

Cell.prototype.close = function() {
  this._closed = this._closed || new Pledge();
  this._doClose();
  return this._closed;
};

Cell.prototype._exec = function(direction: any,  error: any,  message: any,  callback: Function,  context: Object) {
  this._functors[direction].call(error, message, function(err: Error,  msg: String) {
    if (err) err.message = this._ext.name + ': ' + err.message;
    callback.call(context, err, msg);
    this._doClose();
  }, this);
};

Cell.prototype._doClose = function() {
  var fin  = this._functors.incoming,
      fout = this._functors.outgoing;

  if (!this._closed || fin.pending + fout.pending !== 0) return;
  if (this._session) this._session.close();
  this._session = null;
  this._closed.done();
};

export default Cell;