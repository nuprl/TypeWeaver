export = destroy;
/**
 * Destroy the given stream, and optionally suppress any future `error` events.
 *
 * @param {object} stream
 * @param {boolean} suppress
 * @public
 */
declare function destroy(stream: object, suppress: boolean): any;
