import isSymbol from '../isSymbol.js'

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH: Number = 4294967295
const MAX_ARRAY_INDEX: Number = MAX_ARRAY_LENGTH - 1

/**
 * The base implementation of `sortedIndexBy` and `sortedLastIndexBy`
 * which invokes `iteratee` for `value` and each element of `array` to compute
 * their sort ranking. The iteratee is invoked with one argument (value).
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndexBy(array: Array, value: Number, iteratee: Function, retHighest: Number): Number {
  let low: Number = 0
  let high: Number = array == null ? 0 : array.length
  if (high == 0) {
    return 0
  }

  value = iteratee(value)

  const valIsNaN: Boolean = value !== value
  const valIsNull: Boolean = value === null
  const valIsSymbol: Boolean = isSymbol(value)
  const valIsUndefined: Boolean = value === undefined

  while (low < high) {
    let setLow: Boolean
    const mid: Number = Math.floor((low + high) / 2)
    const computed: Number = iteratee(array[mid])
    const othIsDefined: Boolean = computed !== undefined
    const othIsNull: Boolean = computed === null
    const othIsReflexive: Boolean = computed === computed
    const othIsSymbol: Boolean = isSymbol(computed)

    if (valIsNaN) {
      setLow = retHighest || othIsReflexive
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined)
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull)
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol)
    } else if (othIsNull || othIsSymbol) {
      setLow = false
    } else {
      setLow = retHighest ? (computed <= value) : (computed < value)
    }
    if (setLow) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return Math.min(high, MAX_ARRAY_INDEX)
}

export default baseSortedIndexBy
