export default Stack;
declare class Stack {
    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    private constructor();
    __data__: any;
    size: any;
    /**
     * Removes all key-value entries from the stack.
     *
     * @memberOf Stack
     */
    clear(): void;
    /**
     * Removes `key` and its value from the stack.
     *
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    delete(key: string): boolean;
    /**
     * Gets the stack value for `key`.
     *
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    get(key: string): any;
    /**
     * Checks if a stack value for `key` exists.
     *
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    has(key: string): boolean;
    /**
     * Sets the stack `key` to `value`.
     *
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    set(key: string, value: any): any;
}
