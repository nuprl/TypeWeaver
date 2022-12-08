/**
 * This function is like `baseFor` except that it iterates over properties
 * in the opposite order.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
function baseForRight(object: object, iteratee: Function, keysFunc: Function): any[] {
  const iterable: object = Object(object)
  const props: any[] = keysFunc(object)
  let { length } = props

  while (length--) {
    const key: string = props[length]
    if (iteratee(iterable[key], key, iterable) === false) {
      break
    }
  }
  return object
}

export default baseForRight
