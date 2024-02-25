/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */
declare function _exports(gen: any, ...args: any[]): Promise<any>;
declare namespace _exports {
    /**
     * Execute the generator function or a generator
     * and return a promise.
     *
     * @param {Function} fn
     * @return {Promise}
     * @api public
     */
    function _default(gen: any, ...args: any[]): Promise<any>;
    namespace _default {
        export { co };
        /**
         * Wrap the given generator `fn` into a
         * function that returns a promise.
         * This is a separate function so that
         * every `co()` call doesn't create a new,
         * unnecessary closure.
         *
         * @param {GeneratorFunction} fn
         * @return {Function}
         * @api public
         */
        export function wrap(fn: GeneratorFunction): Function;
    }
    export { _default as default };
}
export = _exports;
/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */
declare function co(gen: any, ...args: any[]): Promise<any>;
declare namespace co { }
