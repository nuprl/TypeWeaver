export default ReadableSerialOrdered;
export const ascending: any;
export const descending: any;
/**
 * Streaming wrapper to `asynckit.serialOrdered`
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} sortMethod - custom sort function
 * @param   {function} callback - invoked when all elements processed
 * @returns {stream.Readable#}
 */
declare function ReadableSerialOrdered(list: any[] | object, iterator: Function, sortMethod: Function, callback: Function): stream.Readable;
