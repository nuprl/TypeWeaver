import timesLimit from './timesLimit.js'

/**
 * Calls the `iteratee` function `n` times, and accumulates results in the same
 * manner you would use with [map]{@link module:Collections.map}.
 *
 * @name times
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Control Flow
 * @param {number} n - The number of times to run the function.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see {@link module:Collections.map}.
 * @returns {Promise} a promise, if no callback is provided
 * @example
 *
 * // Pretend this is some complicated async factory
 * var createUser = function(id: number,  callback: Function) {
 *     callback(null, {
 *         id: 'user' + id
 *     });
 * };
 *
 * // generate 5 users
 * async.times(5, function(n: number,  next: Function) {
 *     createUser(n, function(err: any,  user: User) {
 *         next(err, user);
 *     });
 * }, function(err: Error,  users: User[]) {
 *     // we should now have 5 users
 * });
 */
export default function times (n: number,  iteratee: Function,  callback: Function) {
    return timesLimit(n, Infinity, iteratee, callback)
}