import copyArray from './.internal/copyArray.js'

/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * shuffle([1, 2, 3, 4])
 * // => [4, 1, 3, 2]
 */
function shuffle(array: any[]): any[] {
  const length: number = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  let index: number = -1
  const lastIndex: number = length - 1
  const result: object = copyArray(array)
  while (++index < length) {
    const rand: string = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value: string = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return result
}

export default shuffle
