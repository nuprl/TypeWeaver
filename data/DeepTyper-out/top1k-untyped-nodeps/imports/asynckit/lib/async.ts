import defer from './defer.js';

// API
module.exports = async;

/**
 * Runs provided callback asynchronously
 * even if callback itself is not
 *
 * @param   {function} callback - callback to invoke
 * @returns {function} - augmented callback
 */
function async(callback: Function)
{
  var isAsync: boolean = false;

  // check if async happened
  defer(function() { isAsync = true; });

  return function async_callback(err: Error, result: any): void
  {
    if (isAsync)
    {
      callback(err, result);
    }
    else
    {
      defer(function nextTick_callback(): void
      {
        callback(err, result);
      });
    }
  };
}
