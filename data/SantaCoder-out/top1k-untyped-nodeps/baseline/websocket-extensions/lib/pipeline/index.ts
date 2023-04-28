'use strict';

var Cell   = require('./cell'),
    Pledge = require('./pledge');

var Pipeline = function(sessions: Array<Session>) {
  this._cells   = sessions.map(function(session: Session) { return new Cell(session) });
  this._stopped = { incoming: false, outgoing: false };
};

Pipeline.prototype.processIncomingMessage = function(message: string, callback: Function, context: any) {
  if (this._stopped.incoming) return;
  this._loop('incoming', this._cells.length - 1, -1, -1, message, callback, context);
};

Pipeline.prototype.processOutgoingMessage = function(message: string, callback: Function, context: any) {
  if (this._stopped.outgoing) return;
  this._loop('outgoing', 0, this._cells.length, 1, message, callback, context);
};

Pipeline.prototype.close = function(callback: Function, context: any) {
  this._stopped = { incoming: true, outgoing: true };

  var closed = this._cells.map(function(a: any) { return a.close() });
  if (callback)
    Pledge.all(closed).then(function() { callback.call(context) });
};

Pipeline.prototype._loop = function(direction: string, start: number, end: number, step: number, message: string, callback: Function, context: Object) {
  var cells = this._cells,
      n     = cells.length,
      self  = this;

  while (n--) cells[n].pending(direction);

  var pipe = function(index: number, error: any, msg: string) {
    if (index === end) return callback.call(context, error, msg);

    cells[index][direction](error, msg, function(err: Error, m: any) {
      if (err) self._stopped[direction] = true;
      pipe(index + step, err, m);
    });
  };
  pipe(start, null, message);
};

module.exports = Pipeline;