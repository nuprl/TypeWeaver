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
function composeArgsRight(args: any[], partials: any[], holders: any[], isCurried: boolean): object {
  let argsIndex: number = -1
  let holdersIndex: number = -1
  let rightIndex: number = -1

  const argsLength: number = args.length
  const holdersLength: number = holders.length
  const rightLength: number = partials.length
  const rangeLength: number = Math.max(argsLength - holdersLength, 0)
  const result: object = new Array(rangeLength + rightLength)
  const isUncurried: boolean = !isCurried

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex]
  }
  const offset: number = argsIndex
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
