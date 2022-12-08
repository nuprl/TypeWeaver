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
function composeArgs(args: any[], partials: any[], holders: any[], isCurried: boolean): object {
  const argsLength: number = args.length
  const holdersLength: number = holders.length
  const leftLength: number = partials.length

  let argsIndex: number = -1
  let leftIndex: number = -1
  let rangeLength: number = Math.max(argsLength - holdersLength, 0)

  const result: object = new Array(leftLength + rangeLength)
  const isUncurried: boolean = !isCurried

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
