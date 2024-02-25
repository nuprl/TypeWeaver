export default arrayReduceRight;
/**
 * A specialized version of `reduceRight` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the last element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
declare function arrayReduceRight(array?: any[], iteratee: Function, accumulator?: any, initAccum?: boolean): any;
