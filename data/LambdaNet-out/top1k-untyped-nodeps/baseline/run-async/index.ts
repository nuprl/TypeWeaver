'use strict';

function isPromise(obj: Array): Boolean {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * Return a function that will run a function asynchronously or synchronously
 *
 * example:
 * runAsync(wrappedFunction, callback)(...args);
 *
 * @param   {Function} func  Function to run
 * @param   {Function} cb    Callback function passed the `func` returned value
 * @return  {Function(arguments)} Arguments to pass to `func`. This function will in turn
 *                                return a Promise (Node >= 0.12) or call the callbacks.
 */

var runAsync: Function = module.exports = function (func: Function, cb: Function) {
  cb = cb || function () {};

  return function () {

    var args: Element = arguments;

    var promise: Promise = new Promise(function (resolve: Function, reject: Function) {
      var resolved: Boolean = false;
      const wrappedResolve: Function = function (value: String) {
        if (resolved) {
          console.warn('Run-async promise already resolved.')
        }
        resolved = true;
        resolve(value);
      }

      var rejected: Boolean = false;
      const wrappedReject: Function = function (value: String) {
        if (rejected) {
          console.warn('Run-async promise already rejected.')
        }
        rejected = true;
        reject(value);
      }

      var usingCallback: Boolean = false;
      var callbackConflict: Boolean = false;
      var contextEnded: Boolean = false;

      var answer: Promise = func.apply({
        async: function () {
          if (contextEnded) {
            console.warn('Run-async async() called outside a valid run-async context, callback will be ignored.');
            return function() {};
          }
          if (callbackConflict) {
            console.warn('Run-async wrapped function (async) returned a promise.\nCalls to async() callback can have unexpected results.');
          }
          usingCallback = true;
          return function (err: Function, value: String) {
            if (err) {
              wrappedReject(err);
            } else {
              wrappedResolve(value);
            }
          };
        }
      }, Array.prototype.slice.call(args));

      if (usingCallback) {
        if (isPromise(answer)) {
          console.warn('Run-async wrapped function (sync) returned a promise but async() callback must be executed to resolve.');
        }
      } else {
        if (isPromise(answer)) {
          callbackConflict = true;
          answer.then(wrappedResolve, wrappedReject);
        } else {
          wrappedResolve(answer);
        }
      }
      contextEnded = true;
    });

    promise.then(cb.bind(null, null), cb);

    return promise;
  }
};

runAsync.cb = function (func: Array, cb: Function) {
  return runAsync(function () {
    var args: Array = Array.prototype.slice.call(arguments);
    if (args.length === func.length - 1) {
      args.push(this.async());
    }
    return func.apply(this, args);
  }, cb);
};
