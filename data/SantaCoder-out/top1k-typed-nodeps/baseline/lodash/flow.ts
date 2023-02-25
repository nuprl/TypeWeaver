/**
 * Composes a function that returns the result of invoking the given functions
 * with the `this` binding of the created function, where each successive
 * invocation is supplied the return value of the previous.
 *
 * @since 3.0.0
 * @category Util
 * @param {Function[]} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see flowRight
 * @example
 *
 * import add from 'lodash/add'
 *
 * function square(n: number) {
 *   return n * n
 * }
 *
 * const addSquare = flow(add, square)
 * addSquare(1, 2)
 * // => 9
 */
function flow(...funcs: Function[]) {
  const length = funcs.length
  let index = length
  while (index--) {
    if (typeof funcs[index] !== 'function') {
      throw new TypeError('Expected a function')
    }
  }
  return function(...args: any[]) {
    let index = 0
    let result = length ? funcs[index].apply(this, args) : args[0]
    while (++index < length) {
      result = funcs[index].call(this, result)
    }
    return result
  }
}

export default flow