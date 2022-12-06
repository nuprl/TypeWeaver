/**
 * The base implementation of methods like `findKey` and `findLastKey`
 * which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFindKey(collection: number, predicate: Function, eachFunc: Function): object {
  let result: Function
  eachFunc(collection, (value: number, key: string, collection: number) => {
    if (predicate(value, key, collection)) {
      result = key
      return false
    }
  })
  return result
}

export default baseFindKey
