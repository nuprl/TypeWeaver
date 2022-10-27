var defer: Function = require('./defer.js');

// API
module.exports = async;

/**
 * Runs provided callback asynchronously
 * even if callback itself is not
 *
 * @param   {function} callback - callback to invoke
 * @returns {function} - augmented callback
 */
function async(callback: Function): Function
{
  var isAsync: Boolean = false;

  // check if async happened
  defer(function() { isAsync = true; });

  return function async_callback(err: String, result: String): Void
  {
    if (isAsync)
    {
      callback(err, result);
    }
    else
    {
      defer(function nextTick_callback(): Void
      {
        callback(err, result);
      });
    }
  };
}
