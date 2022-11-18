var scope: string = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply: Function = Function.prototype.apply;

// DOM APIs, for completeness

export const setTimeout: Function = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};

export const setInterval: Function = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};

export const clearTimeout: Function = exports.clearInterval = function(timeout: Function) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id: string, clearFn: string): Void {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
export const enroll: Function = function(item: object, msecs: number) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

export const unenroll: Function = function(item: object) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

export const _unrefActive: boolean = exports.active = function(item: HTMLElement) {
  clearTimeout(item._idleTimeoutId);

  var msecs: number = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout(): Void {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
import 'setimmediate';

// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
export const setImmediate: number = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);

export const clearImmediate: number = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);
