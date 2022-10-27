/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args: Array, partials: Array, holders: Array, isCurried: Boolean): Object {
  let argsIndex: Number = -1
  let holdersIndex: Number = -1
  let rightIndex: Number = -1

  const argsLength: Number = args.length
  const holdersLength: Number = holders.length
  const rightLength: Number = partials.length
  const rangeLength: Number = Math.max(argsLength - holdersLength, 0)
  const result: Object = new Array(rangeLength + rightLength)
  const isUncurried: Boolean = !isCurried

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex]
  }
  const offset: Number = argsIndex
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex]
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++]
    }
  }
  return result
}

export default composeArgsRight
