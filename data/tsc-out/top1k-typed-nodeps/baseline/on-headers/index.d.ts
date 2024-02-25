export = onHeaders;
/**
 * Execute a listener when a response is about to write headers.
 *
 * @param {object} res
 * @return {function} listener
 * @public
 */
declare function onHeaders(res: object, listener: any): Function;
