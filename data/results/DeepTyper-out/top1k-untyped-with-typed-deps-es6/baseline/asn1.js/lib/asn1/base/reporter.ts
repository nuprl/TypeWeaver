'use strict';

import inherits from 'inherits';

function Reporter(options: any): void {
  this._reporterState = {
    obj: null,
    path: [],
    options: options || {},
    errors: []
  };
}
exports.Reporter = Reporter;

Reporter.prototype.isError = function isError(obj: any): boolean {
  return obj instanceof ReporterError;
};

Reporter.prototype.save = function save(): any {
  const state: any = this._reporterState;

  return { obj: state.obj, pathLen: state.path.length };
};

Reporter.prototype.restore = function restore(data: any): any {
  const state: any = this._reporterState;

  state.obj = data.obj;
  state.path = state.path.slice(0, data.pathLen);
};

Reporter.prototype.enterKey = function enterKey(key: any): any {
  return this._reporterState.path.push(key);
};

Reporter.prototype.exitKey = function exitKey(index: any): any {
  const state: any = this._reporterState;

  state.path = state.path.slice(0, index - 1);
};

Reporter.prototype.leaveKey = function leaveKey(index: any, key: any, value: any): any {
  const state: any = this._reporterState;

  this.exitKey(index);
  if (state.obj !== null)
    state.obj[key] = value;
};

Reporter.prototype.path = function path(): any {
  return this._reporterState.path.join('/');
};

Reporter.prototype.enterObject = function enterObject(): any {
  const state: any = this._reporterState;

  const prev: any = state.obj;
  state.obj = {};
  return prev;
};

Reporter.prototype.leaveObject = function leaveObject(prev: any): any {
  const state: any = this._reporterState;

  const now: any = state.obj;
  state.obj = prev;
  return now;
};

Reporter.prototype.error = function error(msg: any): any {
  let err: any;
  const state: any = this._reporterState;

  const inherited: any = msg instanceof ReporterError;
  if (inherited) {
    err = msg;
  } else {
    err = new ReporterError(state.path.map(function(elem: any) {
      return '[' + JSON.stringify(elem) + ']';
    }).join(''), msg.message || msg, msg.stack);
  }

  if (!state.options.partial)
    throw err;

  if (!inherited)
    state.errors.push(err);

  return err;
};

Reporter.prototype.wrapResult = function wrapResult(result: any): any {
  const state: any = this._reporterState;
  if (!state.options.partial)
    return result;

  return {
    result: this.isError(result) ? null : result,
    errors: state.errors
  };
};

function ReporterError(path: string, msg: string): void {
  this.path = path;
  this.rethrow(msg);
}
inherits(ReporterError, Error);

ReporterError.prototype.rethrow = function rethrow(msg: any): void {
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
