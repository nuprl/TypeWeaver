/**
 * Creates an array of values by running each property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments: (value, key, object).
 *
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * map({ 'a': 4, 'b': 8 }, square)
 * // => [16, 64] (iteration order is not guaranteed)
 */
function mapObject(object: Object, iteratee: Function): Object {
  const props: Array = Object.keys(object)
  const result: Object = new Array(props.length)

  props.forEach((key: String, index: Number) => {
    result[index] = iteratee(object[key], key, object)
  })
  return result
}

export default mapObject
