import isSymbol from '../isSymbol.js'

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value: String, other: Number): Number {
  if (value !== other) {
    const valIsDefined: Boolean = value !== undefined
    const valIsNull: Boolean = value === null
    const valIsReflexive: Boolean = value === value
    const valIsSymbol: Boolean = isSymbol(value)

    const othIsDefined: Boolean = other !== undefined
    const othIsNull: Boolean = other === null
    const othIsReflexive: Boolean = other === other
    const othIsSymbol: Boolean = isSymbol(other)

    const val: Number = typeof value === 'string'
      ? value.localeCompare(other)
      : -other

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && val > 0) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && val < 0) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1
    }
  }
  return 0
}

export default compareAscending
