/**
 * Wraps iterators with long signature
 *
 * @this    ReadableAsyncKit#
 * @param   {function} iterator - function to wrap
 * @returns {function} - wrapped function
 */
declare function wrapIterator(this: ReadableAsyncKit, iterator: Function): Function;
/**
 * Wraps provided callback function
 * allowing to execute snitch function before
 * real callback
 *
 * @this    ReadableAsyncKit#
 * @param   {function} callback - function to wrap
 * @returns {function} - wrapped function
 */
declare function wrapCallback(this: ReadableAsyncKit, callback: Function): Function;
export { wrapIterator as iterator, wrapCallback as callback };
