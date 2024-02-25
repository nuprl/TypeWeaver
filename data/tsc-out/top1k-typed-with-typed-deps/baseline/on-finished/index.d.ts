export = onFinished;
/**
 * Invoke callback when the response has finished, useful for
 * cleaning up resources afterwards.
 *
 * @param {object} msg
 * @param {function} listener
 * @return {object}
 * @public
 */
declare function onFinished(msg: object, listener: Function): object;
declare namespace onFinished {
    export { isFinished };
}
/**
 * Determine if message is already finished.
 *
 * @param {object} msg
 * @return {boolean}
 * @public
 */
declare function isFinished(msg: object): boolean;
