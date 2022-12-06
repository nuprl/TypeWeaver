'use strict';

/**
 * Adds a `.capture` method to a [snapdragon][] `Parser` instance. Wraps
 * the `.set` method to simplify the interface for creating parsers.
 *
 * ```js
 * var Snapdragon = require('snapdragon');
 * var capture = require('snapdragon-capture');
 * var parser = new Snapdragon.Parser();
 * parser.use(capture());
 * ```
 *
 * @api public
 */

module.exports = function(options) {
  return function(snapdragon) {
    if (snapdragon.isSnapdragon) {
      snapdragon.parser.define('capture', capture);
      snapdragon.define('capture', function() {
        return this.parser.capture.apply(this.parser, arguments);
      });

    } else if (snapdragon.isParser) {
      snapdragon.define('capture', capture);

    } else {
      throw new Error('expected an instance of snapdragon or snapdragon.parser');
    }
  };
};

/**
 * Create a node of the given `type` using the specified regex or function.
 *
 * ```js
 * parser
 *   .capture('slash', /^\//)
 *   .capture('comma', /^,/)
 *   .capture('foo', function() {
 *     var pos = this.position();
 *     var match = this.match(/^\./);
 *     if (match) {
 *       return pos(this.node(match[0]));
 *     }
 *   });
 * ```
 * @param {String} `type`
 * @param {RegExp|Function} `regex` Pass the regex to use for capturing. Pass a function if you need access to the parser instance.
 * @return {Object} Returns the parser instance for chaining
 * @api public
 */

function capture(type, regex) {
  if (typeof regex === 'function') {
    return this.set.apply(this, arguments);
  }

  this.regex.set(type, regex);
  this.set(type, function() {
    var pos = this.position();
    var match = this.match(regex);
    if (match) {
      var node = pos(this.node(match[0], type));
      node.match = match;
      return node;
    }
  }.bind(this));
  return this;
}
