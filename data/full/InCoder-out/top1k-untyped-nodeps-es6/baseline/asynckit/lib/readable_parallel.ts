import parallel from '../parallel.js';

// API
export default ReadableParallel;

/**
 * Streaming wrapper to `asynckit.parallel`
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {stream.Readable#}
 */
function ReadableParallel(list: ReadableStream[],  iterator: Iterator<any>,  callback: Function)
{
  if (!(this instanceof ReadableParallel))
  {
    return new ReadableParallel(list, iterator, callback);
  }

  // turn on object mode
  ReadableParallel.super_.call(this, {objectMode: true});

  this._start(parallel, list, iterator, callback);
}