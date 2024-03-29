import onlyOnce from './internal/onlyOnce.js'
import wrapAsync from './internal/wrapAsync.js'
import awaitify from './internal/awaitify.js'

/**
 * Repeatedly call `iteratee`, while `test` returns `true`. Calls `callback` when
 * stopped, or an error occurs.
 *
 * @name whilst
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {AsyncFunction} test - asynchronous truth test to perform before each
 * execution of `iteratee`. Invoked with (callback).
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` passes. Invoked with (callback).
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * var count = 0;
 * async.whilst(
 *     function test(cb: Function) { cb(null, count < 5); },
 *     function iter(callback: Function) {
 *         count++;
 *         setTimeout(function() {
 *             callback(null, count);
 *         }, 1000);
 *     },
 *     function (err: any, n: number) {
 *         // 5 seconds have passed, n = 5
 *     }
 * );
 */
function whilst(test: AsyncFunction, iteratee: AsyncFunction, callback: AsyncFunction) {
    callback = onlyOnce(callback);
    var _fn = wrapAsync(iteratee);
    var _test = wrapAsync(test);
    var results = [];

    function next(err: any, ...rest: any[]) {
        if (err) return callback(err);
        results = rest;
        if (err === false) return;
        _test(check);
    }

    function check(err: any, truth: boolean) {
        if (err) return callback(err);
        if (err === false) return;
        if (!truth) return callback(null, ...results);
        _fn(next);
    }

    return _test(check);
}
export default awaitify(whilst, 3)