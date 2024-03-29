export default baseReduce;
/**
 * The base implementation of `reduce` and `reduceRight` which iterates
 * over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of
 *  `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
declare function baseReduce(collection: any[] | any, iteratee: Function, accumulator: any, initAccum: boolean, eachFunc: Function): any;
