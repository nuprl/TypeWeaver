/** Used to match `RegExp` flags from their coerced string values. */
const reFlags: RegExp = /\w*$/

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp: Hash): Hash {
  const result: Hash = new regexp.constructor(regexp.source, reFlags.exec(regexp))
  result.lastIndex = regexp.lastIndex
  return result
}

export default cloneRegExp
