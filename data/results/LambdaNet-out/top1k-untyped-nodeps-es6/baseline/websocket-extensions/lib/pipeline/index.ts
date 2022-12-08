'use strict';

import Cell from './cell';
import Pledge from './pledge';

var Pipeline: Function = function(sessions: any[]) {
  this._cells   = sessions.map(function(session: any[]) { return new Cell(session) });
  this._stopped = { incoming: false, outgoing: false };
};

Pipeline.prototype.processIncomingMessage = function(message: string, callback: Function, context: string) {
  if (this._stopped.incoming) return;
  this._loop('incoming', this._cells.length - 1, -1, -1, message, callback, context);
};

Pipeline.prototype.processOutgoingMessage = function(message: string, callback: any[], context: string) {
  if (this._stopped.outgoing) return;
  this._loop('outgoing', 0, this._cells.length, 1, message, callback, context);
};

Pipeline.prototype.close = function(callback: Function, context: string) {
  this._stopped = { incoming: true, outgoing: true };

  var closed: any[] = this._cells.map(function(a: string) { return a.close() });
  if (callback)
    Pledge.all(closed).then(function() { callback.call(context) });
};

Pipeline.prototype._loop = function(direction: string, start: string, end: number, step: number, message: string, callback: Function, context: string) {
  var cells: any[] = this._cells,
      n: number     = cells.length,
      self: HTMLElement  = this;

  while (n--) cells[n].pending(direction);

  var pipe: Function = function(index: number, error: object, msg: string) {
    if (index === end) return callback.call(context, error, msg);

    cells[index][direction](error, msg, function(err: Function, m: any[]) {
      if (err) self._stopped[direction] = true;
      pipe(index + step, err, m);
    });
  };
  pipe(start, null, message);
};

export default Pipeline;
