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
export default function _default(options: any): (snapdragon: any) => void;
