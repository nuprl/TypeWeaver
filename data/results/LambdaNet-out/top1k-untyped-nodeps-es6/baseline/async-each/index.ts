// async-each MIT license (by Paul Miller from https://paulmillr.com).
(function(globals: object) {
  'use strict';
  var each: Function = function(items: any[], next: Function, callback: Function) {
    if (!Array.isArray(items)) throw new TypeError('each() expects array as first argument');
    if (typeof next !== 'function') throw new TypeError('each() expects function as second argument');
    if (typeof callback !== 'function') callback = Function.prototype; // no-op

    if (items.length === 0) return callback(undefined, items);

    var transformed: object = new Array(items.length);
    var count: number = 0;
    var returned: boolean = false;

    items.forEach(function(item: number, index: number) {
      next(item, function(error: object, transformedItem: string) {
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
    export default each; // CommonJS
  } else {
    globals.asyncEach = each; // <script>
  }
})(this);
