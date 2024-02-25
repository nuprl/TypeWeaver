export default ReadableSerial;
/**
 * Streaming wrapper to `asynckit.serial`
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {stream.Readable#}
 */
declare function ReadableSerial(list: any[] | object, iterator: Function, callback: Function): stream.Readable;
