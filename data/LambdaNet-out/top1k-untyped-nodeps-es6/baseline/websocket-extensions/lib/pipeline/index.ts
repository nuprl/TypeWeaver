'use strict';

import Cell from './cell';
import Pledge from './pledge';

var Pipeline: Function = function(sessions: Array) {
  this._cells   = sessions.map(function(session: Array) { return new Cell(session) });
  this._stopped = { incoming: false, outgoing: false };
};

Pipeline.prototype.processIncomingMessage = function(message: String, callback: Function, context: String) {
  if (this._stopped.incoming) return;
  this._loop('incoming', this._cells.length - 1, -1, -1, message, callback, context);
};

Pipeline.prototype.processOutgoingMessage = function(message: String, callback: Array, context: String) {
  if (this._stopped.outgoing) return;
  this._loop('outgoing', 0, this._cells.length, 1, message, callback, context);
};

Pipeline.prototype.close = function(callback: Function, context: String) {
  this._stopped = { incoming: true, outgoing: true };

  var closed: Array = this._cells.map(function(a: String) { return a.close() });
  if (callback)
    Pledge.all(closed).then(function() { callback.call(context) });
};

Pipeline.prototype._loop = function(direction: String, start: String, end: Number, step: Number, message: String, callback: Function, context: String) {
  var cells: Array = this._cells,
      n: Number     = cells.length,
      self: HTMLElement  = this;

  while (n--) cells[n].pending(direction);

  var pipe: Function = function(index: Number, error: Object, msg: String) {
    if (index === end) return callback.call(context, error, msg);

    cells[index][direction](error, msg, function(err: Function, m: Array) {
      if (err) self._stopped[direction] = true;
      pipe(index + step, err, m);
    });
  };
  pipe(start, null, message);
};

export default Pipeline;
