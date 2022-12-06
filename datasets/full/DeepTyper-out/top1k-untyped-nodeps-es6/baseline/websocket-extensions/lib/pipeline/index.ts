'use strict';

import Cell from './cell';
import Pledge from './pledge';

var Pipeline: void = function(sessions: any) {
  this._cells   = sessions.map(function(session: Session) { return new Cell(session) });
  this._stopped = { incoming: false, outgoing: false };
};

Pipeline.prototype.processIncomingMessage = function(message: any, callback: any, context: any) {
  if (this._stopped.incoming) return;
  this._loop('incoming', this._cells.length - 1, -1, -1, message, callback, context);
};

Pipeline.prototype.processOutgoingMessage = function(message: any, callback: any, context: any) {
  if (this._stopped.outgoing) return;
  this._loop('outgoing', 0, this._cells.length, 1, message, callback, context);
};

Pipeline.prototype.close = function(callback: any, context: any) {
  this._stopped = { incoming: true, outgoing: true };

  var closed: any = this._cells.map(function(a: any) { return a.close() });
  if (callback)
    Pledge.all(closed).then(function() { callback.call(context) });
};

Pipeline.prototype._loop = function(direction: any, start: any, end: any, step: number, message: any, callback: any, context: any) {
  var cells: any[] = this._cells,
      n     = cells.length,
      self  = this;

  while (n--) cells[n].pending(direction);

  var pipe: void = function(index: number, error: any, msg: any) {
    if (index === end) return callback.call(context, error, msg);

    cells[index][direction](error, msg, function(err: any, m: any) {
      if (err) self._stopped[direction] = true;
      pipe(index + step, err, m);
    });
  };
  pipe(start, null, message);
};

export default Pipeline;
