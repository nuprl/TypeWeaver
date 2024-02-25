export default createSet;
/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
declare const createSet: ((values: any) => Set<any>) | (() => void);
