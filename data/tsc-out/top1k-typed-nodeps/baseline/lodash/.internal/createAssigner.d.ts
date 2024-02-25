export default createAssigner;
/**
 * Creates a function like `assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
declare function createAssigner(assigner: Function): Function;
