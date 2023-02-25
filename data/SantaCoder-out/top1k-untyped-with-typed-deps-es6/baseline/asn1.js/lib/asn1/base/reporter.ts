'use strict';

import inherits from 'inherits';

function Reporter(options: ReporterOptions) {
  this._reporterState = {
    obj: null,
    path: [],
    options: options || {},
    errors: []
  };
}
exports.Reporter = Reporter;

Reporter.prototype.isError = function isError(obj: any) {
  return obj instanceof ReporterError;
};

Reporter.prototype.save = function save() {
  const state = this._reporterState;

  return { obj: state.obj, pathLen: state.path.length };
};

Reporter.prototype.restore = function restore(data: any) {
  const state = this._reporterState;

  state.obj = data.obj;
  state.path = state.path.slice(0, data.pathLen);
};

Reporter.prototype.enterKey = function enterKey(key: string) {
  return this._reporterState.path.push(key);
};

Reporter.prototype.exitKey = function exitKey(index: number) {
  const state = this._reporterState;

  state.path = state.path.slice(0, index - 1);
};

Reporter.prototype.leaveKey = function leaveKey(index: number, key: string, value: any) {
  const state = this._reporterState;

  this.exitKey(index);
  if (state.obj !== null)
    state.obj[key] = value;
};

Reporter.prototype.path = function path() {
  return this._reporterState.path.join('/');
};

Reporter.prototype.enterObject = function enterObject() {
  const state = this._reporterState;

  const prev = state.obj;
  state.obj = {};
  return prev;
};

Reporter.prototype.leaveObject = function leaveObject(prev: ReporterState) {
  const state = this._reporterState;

  const now = state.obj;
  state.obj = prev;
  return now;
};

Reporter.prototype.error = function error(msg: string) {
  let err;
  const state = this._reporterState;

  const inherited = msg instanceof ReporterError;
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

Reporter.prototype.wrapResult = function wrapResult(result: any) {
  const state = this._reporterState;
  if (!state.options.partial)
    return result;

  return {
    result: this.isError(result) ? null : result,
    errors: state.errors
  };
};

function ReporterError(path: string, msg: string) {
  this.path = path;
  this.rethrow(msg);
}
inherits(ReporterError, Error);

ReporterError.prototype.rethrow = function rethrow(msg: string) {
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