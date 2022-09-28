// async-each MIT license (by Paul Miller from https://paulmillr.com).
(function(globals: Object) {
  'use strict';
  var each: Function = function(items: Array, next: Function, callback: Function) {
    if (!Array.isArray(items)) throw new TypeError('each() expects array as first argument');
    if (typeof next !== 'function') throw new TypeError('each() expects function as second argument');
    if (typeof callback !== 'function') callback = Function.prototype; // no-op

    if (items.length === 0) return callback(undefined, items);

    var transformed: Object = new Array(items.length);
    var count: Number = 0;
    var returned: Boolean = false;

    items.forEach(function(item: Number, index: Number) {
      next(item, function(error: Object, transformedItem: String) {
        if (returned) return;
        if (error) {
          returned = true;
          return callback(error);
        }
        transformed[index] = transformedItem;
        count += 1;
        if (count === items.length) return callback(undefined, transformed);
      });
    });
  };

  if (typeof define !== 'undefined' && define.amd) {
    define([], function() {
      return each;
    }); // RequireJS
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = each; // CommonJS
  } else {
    globals.asyncEach = each; // <script>
  }
})(this);
