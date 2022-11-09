import isPrototype from './isPrototype.js'

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object: Object): Hash {
  return (typeof object.constructor === 'function' && !isPrototype(object))
    ? Object.create(Object.getPrototypeOf(object))
    : {}
}

export default initCloneObject
