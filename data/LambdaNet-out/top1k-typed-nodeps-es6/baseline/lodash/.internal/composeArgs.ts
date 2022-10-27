/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args: Array, partials: Array, holders: Array, isCurried: Boolean): Object {
  const argsLength: Number = args.length
  const holdersLength: Number = holders.length
  const leftLength: Number = partials.length

  let argsIndex: Number = -1
  let leftIndex: Number = -1
  let rangeLength: Number = Math.max(argsLength - holdersLength, 0)

  const result: Object = new Array(leftLength + rangeLength)
  const isUncurried: Boolean = !isCurried

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex]
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex]
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++]
  }
  return result
}

export default composeArgs
