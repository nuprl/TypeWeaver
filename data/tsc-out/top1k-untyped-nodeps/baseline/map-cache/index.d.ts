export = MapCache;
/**
 * Creates a cache object to store key/value pairs.
 *
 * ```js
 * var cache = new MapCache();
 * ```
 *
 * @api public
 */
declare function MapCache(data: any): void;
declare class MapCache {
    /**
     * Creates a cache object to store key/value pairs.
     *
     * ```js
     * var cache = new MapCache();
     * ```
     *
     * @api public
     */
    constructor(data: any);
    __data__: any;
    /**
     * Adds `value` to `key` on the cache.
     *
     * ```js
     * cache.set('foo', 'bar');
     * ```
     *
     * @param {String} `key` The key of the value to cache.
     * @param {*} `value` The value to cache.
     * @returns {Object} Returns the `Cache` object for chaining.
     * @api public
     */
    set(key: string, value: any): any;
    /**
     * Gets the cached value for `key`.
     *
     * ```js
     * cache.get('foo');
     * //=> 'bar'
     * ```
     *
     * @param {String} `key` The key of the value to get.
     * @returns {*} Returns the cached value.
     * @api public
     */
    get(key: string): any;
    /**
     * Checks if a cached value for `key` exists.
     *
     * ```js
     * cache.has('foo');
     * //=> true
     * ```
     *
     * @param {String} `key` The key of the entry to check.
     * @returns {Boolean} Returns `true` if an entry for `key` exists, else `false`.
     * @api public
     */
    has(key: string): boolean;
    /**
     * Removes `key` and its value from the cache.
     *
     * ```js
     * cache.del('foo');
     * ```
     * @title .del
     * @param {String} `key` The key of the value to remove.
     * @returns {Boolean} Returns `true` if the entry was removed successfully, else `false`.
     * @api public
     */
    del(key: string): boolean;
}
