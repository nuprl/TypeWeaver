import baseFor from './baseFor.js'
import keys from '../keys.js'

/**
 * The base implementation of `forOwn`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object: object, iteratee: number): boolean {
  return object && baseFor(object, iteratee, keys)
}

export default baseForOwn
