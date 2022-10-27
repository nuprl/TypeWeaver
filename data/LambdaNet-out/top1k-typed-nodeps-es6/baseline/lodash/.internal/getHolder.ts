/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder(func: Object): String {
  const object: Object = func
  return object.placeholder
}

export default getHolder
