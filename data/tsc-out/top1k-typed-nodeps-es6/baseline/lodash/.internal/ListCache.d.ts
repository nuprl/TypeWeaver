export default ListCache;
declare class ListCache {
    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    private constructor();
    /**
     * Removes all key-value entries from the list cache.
     *
     * @memberOf ListCache
     */
    clear(): void;
    __data__: any[];
    size: number;
    /**
     * Removes `key` and its value from the list cache.
     *
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    delete(key: string): boolean;
    /**
     * Gets the list cache value for `key`.
     *
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    get(key: string): any;
    /**
     * Checks if a list cache value for `key` exists.
     *
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    has(key: string): boolean;
    /**
     * Sets the list cache `key` to `value`.
     *
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    set(key: string, value: any): any;
}
