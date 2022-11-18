'use strict';

import inherits from 'inherits';

function Reporter(options: object): Void {
  this._reporterState = {
    obj: null,
    path: [],
    options: options || {},
    errors: []
  };
}
exports.Reporter = Reporter;

Reporter.prototype.isError = function isError(obj: string): boolean {
  return obj instanceof ReporterError;
};

Reporter.prototype.save = function save(): object {
  const state: Function = this._reporterState;

  return { obj: state.obj, pathLen: state.path.length };
};

Reporter.prototype.restore = function restore(data: object): Void {
  const state: object = this._reporterState;

  state.obj = data.obj;
  state.path = state.path.slice(0, data.pathLen);
};

Reporter.prototype.enterKey = function enterKey(key: string): number {
  return this._reporterState.path.push(key);
};

Reporter.prototype.exitKey = function exitKey(index: number): Void {
  const state: Function = this._reporterState;

  state.path = state.path.slice(0, index - 1);
};

Reporter.prototype.leaveKey = function leaveKey(index: number, key: string, value: string): Void {
  const state: object = this._reporterState;

  this.exitKey(index);
  if (state.obj !== null)
    state.obj[key] = value;
};

Reporter.prototype.path = function path(): string {
  return this._reporterState.path.join('/');
};

Reporter.prototype.enterObject = function enterObject(): object {
  const state: object = this._reporterState;

  const prev: HTMLElement = state.obj;
  state.obj = {};
  return prev;
};

Reporter.prototype.leaveObject = function leaveObject(prev: string): object {
  const state: object = this._reporterState;

  const now: HTMLElement = state.obj;
  state.obj = prev;
  return now;
};

Reporter.prototype.error = function error(msg: object): object {
  let err: object;
  const state: object = this._reporterState;

  const inherited: boolean = msg instanceof ReporterError;
  if (inherited) {
    err = msg;
  } else {
    err = new ReporterError(state.path.map(function(elem: any[]) {
      return '[' + JSON.stringify(elem) + ']';
    }).join(''), msg.message || msg, msg.stack);
  }

  if (!state.options.partial)
    throw err;

  if (!inherited)
    state.errors.push(err);

  return err;
};

Reporter.prototype.wrapResult = function wrapResult(result: any[]): object {
  const state: object = this._reporterState;
  if (!state.options.partial)
    return result;

  return {
    result: this.isError(result) ? null : result,
    errors: state.errors
  };
};

function ReporterError(path: string, msg: string): Void {
  this.path = path;
  this.rethrow(msg);
}
inherits(ReporterError, Error);

ReporterError.prototype.rethrow = function rethrow(msg: string): object {
  this.message = msg + ' at: ' + (this.path || '(shallow)');
  if (Error.captureStackTrace)
    Error.captureStackTrace(this, ReporterError);

  if (!this.stack) {
    try {
      // IE only adds stack when thrown
      throw new Error(this.message);
    } catch (e) {
      this.stack = e.stack;
    }
  }
  return this;
};
