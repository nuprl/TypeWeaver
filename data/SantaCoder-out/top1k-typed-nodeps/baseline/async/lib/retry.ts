import wrapAsync from './internal/wrapAsync.js'
import { promiseCallback, PROMISE_SYMBOL } from './internal/promiseCallback.js'

function constant(value: any) {
    return function () {
        return value;
    }
}

/**
 * Attempts to get a successful response from `task` no more than `times` times
 * before returning an error. If the task is successful, the `callback` will be
 * passed the result of the successful task. If all attempts fail, the callback
 * will be passed the error and result (if any) of the final attempt.
 *
 * @name retry
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @see [async.retryable]{@link module:ControlFlow.retryable}
 * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - Can be either an
 * object with `times` and `interval` or a number.
 * * `times` - The number of attempts to make before giving up.  The default
 *   is `5`.
 * * `interval` - The time to wait between retries, in milliseconds.  The
 *   default is `0`. The interval may also be specified as a function of the
 *   retry count (see example).
 * * `errorFilter` - An optional synchronous function that is invoked on
 *   erroneous result. If it returns `true` the retry attempts will continue;
 *   if the function returns `false` the retry flow is aborted with the current
 *   attempt's error and result being returned to the final callback.
 *   Invoked with (err).
 * * If `opts` is a number, the number specifies the number of times to retry,
 *   with the default interval of `0`.
 * @param {AsyncFunction} task - An async function to retry.
 * Invoked with (callback).
 * @param {Function} [callback] - An optional callback which is called when the
 * task has succeeded, or after the final failed attempt. It receives the `err`
 * and `result` arguments of the last attempt at completing the `task`. Invoked
 * with (err, results).
 * @returns {Promise} a promise if no callback provided
 *
 * @example
 *
 * // The `retry` function can be used as a stand-alone control flow by passing
 * // a callback, as shown below:
 *
 * // try calling apiMethod 3 times
 * async.retry(3, apiMethod, function(err: any, result: any) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod 3 times, waiting 200 ms between each retry
 * async.retry({times: 3, interval: 200}, apiMethod, function(err: any, result: any) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod 10 times with exponential backoff
 * // (i.e. intervals of 100, 200, 400, 800, 1600, ... milliseconds)
 * async.retry({
 *   times: 10,
 *   interval: function(retryCount: number) {
 *     return 50 * Math.pow(2, retryCount);
 *   }
 * }, apiMethod, function(err: any, result: any) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod the default 5 times no delay between each retry
 * async.retry(apiMethod, function(err: Error, result: any) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod only when error condition satisfies, all other
 * // errors will abort the retry control flow and return to final callback
 * async.retry({
 *   errorFilter: function(err: Error) {
 *     return err.message === 'Temporary error'; // only retry on a specific error
 *   }
 * }, apiMethod, function(err: any, result: any) {
 *     // do something with the result
 * });
 *
 * // to retry individual methods that are not as reliable within other
 * // control flow functions, use the `retryable` wrapper:
 * async.auto({
 *     users: api.getUsers.bind(api),
 *     payments: async.retryable(3, api.getPayments.bind(api))
 * }, function(err: any, results: any) {
 *     // do something with the results
 * });
 *
 */
const DEFAULT_TIMES = 5;
const DEFAULT_INTERVAL = 0;

export default function retry(opts: Options, task: Function, callback: Function) {
    var options = {
        times: DEFAULT_TIMES,
        intervalFunc: constant(DEFAULT_INTERVAL)
    };

    if (arguments.length < 3 && typeof opts === 'function') {
        callback = task || promiseCallback();
        task = opts;
    } else {
        parseTimes(options, opts);
        callback = callback || promiseCallback();
    }

    if (typeof task !== 'function') {
        throw new Error("Invalid arguments for async.retry");
    }

    var _task = wrapAsync(task);

    var attempt = 1;
    function retryAttempt() {
        _task((err, ...args) => {
            if (err === false) return
            if (err && attempt++ < options.times &&
                (typeof options.errorFilter != 'function' ||
                    options.errorFilter(err))) {
                setTimeout(retryAttempt, options.intervalFunc(attempt - 1));
            } else {
                callback(err, ...args);
            }
        });
    }

    retryAttempt();
    return callback[PROMISE_SYMBOL]
}

function parseTimes(acc: any, t: any) {
    if (typeof t === 'object') {
        acc.times = +t.times || DEFAULT_TIMES;

        acc.intervalFunc = typeof t.interval === 'function' ?
            t.interval :
            constant(+t.interval || DEFAULT_INTERVAL);

        acc.errorFilter = t.errorFilter;
    } else if (typeof t === 'number' || typeof t === 'string') {
        acc.times = +t || DEFAULT_TIMES;
    } else {
        throw new Error("Invalid arguments for async.retry");
    }
}