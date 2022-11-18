import isSymbol from '../isSymbol.js'

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value: string, other: number): number {
  if (value !== other) {
    const valIsDefined: boolean = value !== undefined
    const valIsNull: boolean = value === null
    const valIsReflexive: boolean = value === value
    const valIsSymbol: boolean = isSymbol(value)

    const othIsDefined: boolean = other !== undefined
    const othIsNull: boolean = other === null
    const othIsReflexive: boolean = other === other
    const othIsSymbol: boolean = isSymbol(other)

    const val: number = typeof value === 'string'
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
