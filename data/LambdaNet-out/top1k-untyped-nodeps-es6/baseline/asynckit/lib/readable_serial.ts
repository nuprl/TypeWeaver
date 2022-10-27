import serial from '../serial.js';

// API
export default ReadableSerial;

/**
 * Streaming wrapper to `asynckit.serial`
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {stream.Readable#}
 */
function ReadableSerial(list: Object, iterator: Function, callback: Function): Object
{
  if (!(this instanceof ReadableSerial))
  {
    return new ReadableSerial(list, iterator, callback);
  }

  // turn on object mode
  ReadableSerial.super_.call(this, {objectMode: true});

  this._start(serial, list, iterator, callback);
}
