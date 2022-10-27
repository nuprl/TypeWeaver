'use strict';

import inherits from 'inherits';

function Reporter(options: Object): Void {
  this._reporterState = {
    obj: null,
    path: [],
    options: options || {},
    errors: []
  };
}
exports.Reporter = Reporter;

Reporter.prototype.isError = function isError(obj: String): Boolean {
  return obj instanceof ReporterError;
};

Reporter.prototype.save = function save(): Object {
  const state: Function = this._reporterState;

  return { obj: state.obj, pathLen: state.path.length };
};

Reporter.prototype.restore = function restore(data: Object): Void {
  const state: Object = this._reporterState;

  state.obj = data.obj;
  state.path = state.path.slice(0, data.pathLen);
};

Reporter.prototype.enterKey = function enterKey(key: String): Number {
  return this._reporterState.path.push(key);
};

Reporter.prototype.exitKey = function exitKey(index: Number): Void {
  const state: Function = this._reporterState;

  state.path = state.path.slice(0, index - 1);
};

Reporter.prototype.leaveKey = function leaveKey(index: Number, key: String, value: String): Void {
  const state: Object = this._reporterState;

  this.exitKey(index);
  if (state.obj !== null)
    state.obj[key] = value;
};

Reporter.prototype.path = function path(): String {
  return this._reporterState.path.join('/');
};

Reporter.prototype.enterObject = function enterObject(): Object {
  const state: Object = this._reporterState;

  const prev: HTMLElement = state.obj;
  state.obj = {};
  return prev;
};

Reporter.prototype.leaveObject = function leaveObject(prev: String): Object {
  const state: Object = this._reporterState;

  const now: HTMLElement = state.obj;
  state.obj = prev;
  return now;
};

Reporter.prototype.error = function error(msg: Object): Object {
  let err: Object;
  const state: Object = this._reporterState;

  const inherited: Boolean = msg instanceof ReporterError;
  if (inherited) {
    err = msg;
  } else {
    err = new ReporterError(state.path.map(function(elem: Array) {
      return '[' + JSON.stringify(elem) + ']';
    }).join(''), msg.message || msg, msg.stack);
  }

  if (!state.options.partial)
    throw err;

  if (!inherited)
    state.errors.push(err);

  return err;
};

Reporter.prototype.wrapResult = function wrapResult(result: Array): Object {
  const state: Object = this._reporterState;
  if (!state.options.partial)
    return result;

  return {
    result: this.isError(result) ? null : result,
    errors: state.errors
  };
};

function ReporterError(path: String, msg: String): Void {
  this.path = path;
  this.rethrow(msg);
}
inherits(ReporterError, Error);

ReporterError.prototype.rethrow = function rethrow(msg: String): Object {
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
