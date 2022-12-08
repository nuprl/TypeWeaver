import serialOrdered from '../serialOrdered.js';

// API
export default ReadableSerialOrdered;

// expose sort helpers
export const ascending = serialOrdered.ascending;

export const descending = serialOrdered.descending;

/**
 * Streaming wrapper to `asynckit.serialOrdered`
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} sortMethod - custom sort function
 * @param   {function} callback - invoked when all elements processed
 * @returns {stream.Readable#}
 */
function ReadableSerialOrdered(list, iterator, sortMethod, callback)
{
  if (!(this instanceof ReadableSerialOrdered))
  {
    return new ReadableSerialOrdered(list, iterator, sortMethod, callback);
  }

  // turn on object mode
  ReadableSerialOrdered.super_.call(this, {objectMode: true});

  this._start(serialOrdered, list, iterator, sortMethod, callback);
}
