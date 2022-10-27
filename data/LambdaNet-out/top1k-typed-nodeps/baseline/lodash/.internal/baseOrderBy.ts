import baseEach from './baseEach.js'
import baseSortBy from './baseSortBy.js'
import baseGet from './baseGet.js'
import compareMultiple from './compareMultiple.js'
import isArrayLike from '../isArrayLike.js'

const identity: Function = (value: String) => value

/**
 * The base implementation of `orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection: Array, iteratees: Array, orders: Number): Promise {
  if (iteratees.length) {
    iteratees = iteratees.map((iteratee: Array) => {
      if (Array.isArray(iteratee)) {
        return (value: String) => baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee)
      }

      return iteratee
    })
  } else {
    iteratees = [identity]
  }

  let criteriaIndex: Number = -1
  let eachIndex: Number = -1

  const result: Array = isArrayLike(collection) ? new Array(collection.length) : []

  baseEach(collection, (value: String) => {
    const criteria: Array = iteratees.map((iteratee: Function) => iteratee(value))

    result[++eachIndex] = {
      criteria,
      index: ++criteriaIndex,
      value
    }
  })

  return baseSortBy(result, (object: Object, other: Number) => compareMultiple(object, other, orders))
}

export default baseOrderBy
