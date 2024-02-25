export default SetCache;
declare class SetCache {
    /**
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    private constructor();
    __data__: any;
    /**
     * Adds `value` to the array cache.
     *
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    add(value: any): any;
    /**
     * Checks if `value` is in the array cache.
     *
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     */
    has(value: any): boolean;
    push: (value: any) => any;
}
