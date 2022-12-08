'use strict';

function isPromise(obj: any[]): boolean {
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
      var resolved: boolean = false;
      const wrappedResolve: Function = function (value: string) {
        if (resolved) {
          console.warn('Run-async promise already resolved.')
        }
        resolved = true;
        resolve(value);
      }

      var rejected: boolean = false;
      const wrappedReject: Function = function (value: string) {
        if (rejected) {
          console.warn('Run-async promise already rejected.')
        }
        rejected = true;
        reject(value);
      }

      var usingCallback: boolean = false;
      var callbackConflict: boolean = false;
      var contextEnded: boolean = false;

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
          return function (err: Function, value: string) {
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

runAsync.cb = function (func: any[], cb: Function) {
  return runAsync(function () {
    var args: any[] = Array.prototype.slice.call(arguments);
    if (args.length === func.length - 1) {
      args.push(this.async());
    }
    return func.apply(this, args);
  }, cb);
};
