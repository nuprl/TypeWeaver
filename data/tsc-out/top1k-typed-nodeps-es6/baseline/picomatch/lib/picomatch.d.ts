export default picomatch;
/**
 * Creates a matcher function from one or more glob patterns. The
 * returned function takes a string to match as its first argument,
 * and returns true if the string is a match. The returned matcher
 * function also takes a boolean as the second argument that, when true,
 * returns an object with additional information.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch(glob[, options]);
 *
 * const isMatch = picomatch('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @name picomatch
 * @param {String|Array} `globs` One or more glob patterns.
 * @param {Object=} `options`
 * @return {Function=} Returns a matcher function.
 * @api public
 */
declare function picomatch(glob: any, options?: any | undefined, returnState?: boolean): Function | undefined;
declare namespace picomatch {
    /**
     * Test `input` with the given `regex`. This is used by the main
     * `picomatch()` function to test the input string.
     *
     * ```js
     * const picomatch = require('picomatch');
     * // picomatch.test(input, regex[, options]);
     *
     * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
     * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
     * ```
     * @param {String} `input` String to test.
     * @param {RegExp} `regex`
     * @return {Object} Returns an object with matching info.
     * @api public
     */
    export function test(input: string, regex: RegExp, options: any, { glob, posix }?: {
        glob: any;
        posix: any;
    }): any;
    /**
     * Match the basename of a filepath.
     *
     * ```js
     * const picomatch = require('picomatch');
     * // picomatch.matchBase(input, glob[, options]);
     * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
     * ```
     * @param {String} `input` String to test.
     * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
     * @return {Boolean}
     * @api public
     */
    export function matchBase(input: string, glob: string | RegExp, options: any, posix?: any): boolean;
    /**
     * Returns true if **any** of the given glob `patterns` match the specified `string`.
     *
     * ```js
     * const picomatch = require('picomatch');
     * // picomatch.isMatch(string, patterns[, options]);
     *
     * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
     * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
     * ```
     * @param {String|Array} str The string to test.
     * @param {String|Array} patterns One or more glob patterns to use for matching.
     * @param {Object} [options] See available [options](#options).
     * @return {Boolean} Returns true if any patterns match `str`
     * @api public
     */
    export function isMatch(str: string | any[], patterns: string | any[], options?: any): boolean;
    /**
     * Parse a glob pattern to create the source string for a regular
     * expression.
     *
     * ```js
     * const picomatch = require('picomatch');
     * const result = picomatch.parse(pattern[, options]);
     * ```
     * @param {String} `pattern`
     * @param {Object} `options`
     * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
     * @api public
     */
    export function parse(pattern: string, options: any): any;
    /**
     * Scan a glob pattern to separate the pattern into segments.
     *
     * ```js
     * const picomatch = require('picomatch');
     * // picomatch.scan(input[, options]);
     *
     * const result = picomatch.scan('!./foo/*.js');
     * console.log(result);
     * { prefix: '!./',
     *   input: '!./foo/*.js',
     *   start: 3,
     *   base: 'foo',
     *   glob: '*.js',
     *   isBrace: false,
     *   isBracket: false,
     *   isGlob: true,
     *   isExtglob: false,
     *   isGlobstar: false,
     *   negated: true }
     * ```
     * @param {String} `input` Glob pattern to scan.
     * @param {Object} `options`
     * @return {Object} Returns an object with
     * @api public
     */
    export function scan(input: string, options: any): any;
    /**
     * Compile a regular expression from the `state` object returned by the
     * [parse()](#parse) method.
     *
     * @param {Object} `state`
     * @param {Object} `options`
     * @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
     * @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
     * @return {RegExp}
     * @api public
     */
    export function compileRe(state: any, options: any, returnOutput?: boolean, returnState?: boolean): RegExp;
    /**
     * Create a regular expression from a parsed glob pattern.
     *
     * ```js
     * const picomatch = require('picomatch');
     * const state = picomatch.parse('*.js');
     * // picomatch.compileRe(state[, options]);
     *
     * console.log(picomatch.compileRe(state));
     * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
     * ```
     * @param {String} `state` The object returned from the `.parse` method.
     * @param {Object} `options`
     * @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
     * @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
     * @return {RegExp} Returns a regex created from the given pattern.
     * @api public
     */
    export function makeRe(input: any, options?: any, returnOutput?: boolean, returnState?: boolean): RegExp;
    /**
     * Create a regular expression from the given regex source string.
     *
     * ```js
     * const picomatch = require('picomatch');
     * // picomatch.toRegex(source[, options]);
     *
     * const { output } = picomatch.parse('*.js');
     * console.log(picomatch.toRegex(output));
     * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
     * ```
     * @param {String} `source` Regular expression source string.
     * @param {Object} `options`
     * @return {RegExp}
     * @api public
     */
    export function toRegex(source: string, options: any): RegExp;
    export { constants };
}
import constants from "./constants";
