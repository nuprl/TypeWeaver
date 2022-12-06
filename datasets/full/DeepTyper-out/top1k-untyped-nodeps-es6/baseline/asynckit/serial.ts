import serialOrdered from './serialOrdered.js';

// Public API
export default serial;

/**
 * Runs iterator over provided array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function serial(list: any, iterator: any, callback: any): any
{
  return serialOrdered(list, iterator, null, callback);
}
