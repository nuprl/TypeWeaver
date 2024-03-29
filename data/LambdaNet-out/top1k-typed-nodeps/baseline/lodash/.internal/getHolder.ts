/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder(func: object): string {
  const object: object = func
  return object.placeholder
}

export default getHolder
