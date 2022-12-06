var scope: any = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply: any = Function.prototype.apply;

// DOM APIs, for completeness

export const setTimeout: any = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};

export const setInterval: any = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};

export const clearTimeout: void = exports.clearInterval = function(timeout: number) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id: number, clearFn: number): void {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
export const enroll: void = function(item: any, msecs: any) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

export const unenroll: void = function(item: any) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

export const _unrefActive: any = exports.active = function(item: any) {
  clearTimeout(item._idleTimeoutId);

  var msecs: any = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout(): void {
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
export const setImmediate: any = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);

export const clearImmediate: void = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);
