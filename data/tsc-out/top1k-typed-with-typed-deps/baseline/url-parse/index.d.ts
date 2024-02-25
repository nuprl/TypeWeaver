export = Url;
/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} [location] Location defaults for relative paths.
 * @param {Boolean|Function} [parser] Parser for the query string.
 * @private
 */
declare function Url(address: string, location?: any | string, parser?: boolean | Function): Url;
declare class Url {
    /**
     * The actual URL instance. Instead of returning an object we've opted-in to
     * create an actual constructor as it's much more memory efficient and
     * faster and it pleases my OCD.
     *
     * It is worth noting that we should not use `URL` as class name to prevent
     * clashes with the global URL instance that got introduced in browsers.
     *
     * @constructor
     * @param {String} address URL we want to parse.
     * @param {Object|String} [location] Location defaults for relative paths.
     * @param {Boolean|Function} [parser] Parser for the query string.
     * @private
     */
    private constructor();
    slashes: any;
    protocol: any;
    query: any;
    username: string;
    password: string;
    origin: string;
    href: string;
    set: typeof set;
    toString: typeof toString;
}
declare namespace Url {
    export { extractProtocol, lolcation as location, trimLeft, qs, ProtocolExtract };
}
/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is truthy.
 *                               When setting the pathname or the hash, a
 *                               leading / or # will not be automatically added
 *                               if it is truthy.
 * @returns {URL} URL instance for chaining.
 * @public
 */
declare function set(part: string, value: Mixed, fn: boolean | Function): URL;
declare class set {
    /**
     * This is convenience method for changing properties in the URL instance to
     * insure that they all propagate correctly.
     *
     * @param {String} part          Property we need to adjust.
     * @param {Mixed} value          The newly assigned value.
     * @param {Boolean|Function} fn  When setting the query, it will be the function
     *                               used to parse the query.
     *                               When setting the protocol, double slash will be
     *                               removed from the final url if it is truthy.
     *                               When setting the pathname or the hash, a
     *                               leading / or # will not be automatically added
     *                               if it is truthy.
     * @returns {URL} URL instance for chaining.
     * @public
     */
    constructor(part: string, value: Mixed, fn: boolean | Function);
    auth: any;
    origin: string;
    href: string;
}
/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
declare function toString(stringify: Function): string;
/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */
/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @param {Object} location
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
declare function extractProtocol(address: string, location: any): ProtocolExtract;
/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
declare function lolcation(loc: any | string): any;
/**
 * Remove control characters and whitespace from the beginning of a string.
 *
 * @param {Object|String} str String to trim.
 * @returns {String} A new string representing `str` stripped of control
 *     characters and whitespace from its beginning.
 * @public
 */
declare function trimLeft(str: any | string): string;
import qs = require("querystringify");
type ProtocolExtract = {
    /**
     * `true` if protocol is followed by "//", else `false`.
     */
    slashes: boolean;
    /**
     * Rest of the URL that is not part of the protocol.
     */
    rest: string;
};
