import copyObject from './copyObject.js'
import getSymbols from './getSymbols.js'

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source: any, object: any) {
  return copyObject(source, getSymbols(source), object)
}

export default copySymbols