'use strict';

var Functor: any[] = require('./functor'),
    Pledge: any[]  = require('./pledge');

var Cell: Function = function(tuple: Promise) {
  this._ext     = tuple[0];
  this._session = tuple[1];

  this._functors = {
    incoming: new Functor(this._session, 'processIncomingMessage'),
    outgoing: new Functor(this._session, 'processOutgoingMessage')
  };
};

Cell.prototype.pending = function(direction: any[]) {
  var functor: object = this._functors[direction];
  if (!functor._stopped) functor.pending += 1;
};

Cell.prototype.incoming = function(error: object, message: string, callback: Function, context: string) {
  this._exec('incoming', error, message, callback, context);
};

Cell.prototype.outgoing = function(error: object, message: string, callback: Function, context: string) {
  this._exec('outgoing', error, message, callback, context);
};

Cell.prototype.close = function() {
  this._closed = this._closed || new Pledge();
  this._doClose();
  return this._closed;
};

Cell.prototype._exec = function(direction: any[], error: object, message: string, callback: Function, context: string) {
  this._functors[direction].call(error, message, function(err: Record, msg: string) {
    if (err) err.message = this._ext.name + ': ' + err.message;
    callback.call(context, err, msg);
    this._doClose();
  }, this);
};

Cell.prototype._doClose = function() {
  var fin: any[]  = this._functors.incoming,
      fout: any[] = this._functors.outgoing;

  if (!this._closed || fin.pending + fout.pending !== 0) return;
  if (this._session) this._session.close();
  this._session = null;
  this._closed.done();
};

module.exports = Cell;
