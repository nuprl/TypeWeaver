export default baseMatchesProperty;
/**
 * The base implementation of `matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
declare function baseMatchesProperty(path: string, srcValue: any): Function;
