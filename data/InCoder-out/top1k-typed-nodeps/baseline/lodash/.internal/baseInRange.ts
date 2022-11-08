/**
 * The base implementation of `inRange` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to check.
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 */
function baseInRange(number: number,  start: number,  end: number) {
  return number >= Math.min(start, end) && number < Math.max(start, end)
}

export default baseInRange