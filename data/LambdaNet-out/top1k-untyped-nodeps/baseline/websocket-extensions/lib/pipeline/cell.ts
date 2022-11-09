'use strict';

var Functor: Array = require('./functor'),
    Pledge: Array  = require('./pledge');

var Cell: Function = function(tuple: Promise) {
  this._ext     = tuple[0];
  this._session = tuple[1];

  this._functors = {
    incoming: new Functor(this._session, 'processIncomingMessage'),
    outgoing: new Functor(this._session, 'processOutgoingMessage')
  };
};

Cell.prototype.pending = function(direction: Array) {
  var functor: Object = this._functors[direction];
  if (!functor._stopped) functor.pending += 1;
};

Cell.prototype.incoming = function(error: Object, message: String, callback: Function, context: String) {
  this._exec('incoming', error, message, callback, context);
};

Cell.prototype.outgoing = function(error: Object, message: String, callback: Function, context: String) {
  this._exec('outgoing', error, message, callback, context);
};

Cell.prototype.close = function() {
  this._closed = this._closed || new Pledge();
  this._doClose();
  return this._closed;
};

Cell.prototype._exec = function(direction: Array, error: Object, message: String, callback: Function, context: String) {
  this._functors[direction].call(error, message, function(err: Record, msg: String) {
    if (err) err.message = this._ext.name + ': ' + err.message;
    callback.call(context, err, msg);
    this._doClose();
  }, this);
};

Cell.prototype._doClose = function() {
  var fin: Array  = this._functors.incoming,
      fout: Array = this._functors.outgoing;

  if (!this._closed || fin.pending + fout.pending !== 0) return;
  if (this._session) this._session.close();
  this._session = null;
  this._closed.done();
};

module.exports = Cell;
