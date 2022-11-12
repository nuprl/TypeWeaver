var async: Function = require('./async.js');

// API
module.exports = {
  iterator: wrapIterator,
  callback: wrapCallback
};

/**
 * Wraps iterators with long signature
 *
 * @this    ReadableAsyncKit#
 * @param   {function} iterator - function to wrap
 * @returns {function} - wrapped function
 */
function wrapIterator(iterator: Function): Function
{
  var stream: Array = this;

  return function(item: String, key: String, cb: String)
  {
    var aborter: Number
      , wrappedCb: Array = async(wrapIteratorCallback.call(stream, cb, key))
      ;

    stream.jobs[key] = wrappedCb;

    // it's either shortcut (item, cb)
    if (iterator.length == 2)
    {
      aborter = iterator(item, wrappedCb);
    }
    // or long format (item, key, cb)
    else
    {
      aborter = iterator(item, key, wrappedCb);
    }

    return aborter;
  };
}

/**
 * Wraps provided callback function
 * allowing to execute snitch function before
 * real callback
 *
 * @this    ReadableAsyncKit#
 * @param   {function} callback - function to wrap
 * @returns {function} - wrapped function
 */
function wrapCallback(callback: String): Function
{
  var stream: Array = this;

  var wrapped: Function = function(error: Object, result: String)
  {
    return finisher.call(stream, error, result, callback);
  };

  return wrapped;
}

/**
 * Wraps provided iterator callback function
 * makes sure snitch only called once,
 * but passes secondary calls to the original callback
 *
 * @this    ReadableAsyncKit#
 * @param   {function} callback - callback to wrap
 * @param   {number|string} key - iteration key
 * @returns {function} wrapped callback
 */
function wrapIteratorCallback(callback: Function, key: String): Function
{
  var stream: Array = this;

  return function(error: Object, output: Number)
  {
    // don't repeat yourself
    if (!(key in stream.jobs))
    {
      callback(error, output);
      return;
    }

    // clean up jobs
    delete stream.jobs[key];

    return streamer.call(stream, error, {key: key, value: output}, callback);
  };
}

/**
 * Stream wrapper for iterator callback
 *
 * @this  ReadableAsyncKit#
 * @param {mixed} error - error response
 * @param {mixed} output - iterator output
 * @param {function} callback - callback that expects iterator results
 */
function streamer(error: Object, output: Object, callback: Function): Void
{
  if (error && !this.error)
  {
    this.error = error;
    this.pause();
    this.emit('error', error);
    // send back value only, as expected
    callback(error, output && output.value);
    return;
  }

  // stream stuff
  this.push(output);

  // back to original track
  // send back value only, as expected
  callback(error, output && output.value);
}

/**
 * Stream wrapper for finishing callback
 *
 * @this  ReadableAsyncKit#
 * @param {mixed} error - error response
 * @param {mixed} output - iterator output
 * @param {function} callback - callback that expects final results
 */
function finisher(error: Object, output: String, callback: Function): Void
{
  // signal end of the stream
  // only for successfully finished streams
  if (!error)
  {
    this.push(null);
  }

  // back to original track
  callback(error, output);
}
