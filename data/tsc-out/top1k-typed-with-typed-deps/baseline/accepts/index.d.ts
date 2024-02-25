export = Accepts;
/**
 * Create a new Accepts object for the given req.
 *
 * @param {object} req
 * @public
 */
declare function Accepts(req: object): Accepts;
declare class Accepts {
    /**
     * Create a new Accepts object for the given req.
     *
     * @param {object} req
     * @public
     */
    constructor(req: object);
    headers: any;
    negotiator: Negotiator;
    /**
     * Check if the given `type(s)` is acceptable, returning
     * the best match when true, otherwise `undefined`, in which
     * case you should respond with 406 "Not Acceptable".
     *
     * The `type` value may be a single mime type string
     * such as "application/json", the extension name
     * such as "json" or an array `["json", "html", "text/plain"]`. When a list
     * or array is given the _best_ match, if any is returned.
     *
     * Examples:
     *
     *     // Accept: text/html
     *     this.types('html');
     *     // => "html"
     *
     *     // Accept: text/*, application/json
     *     this.types('html');
     *     // => "html"
     *     this.types('text/html');
     *     // => "text/html"
     *     this.types('json', 'text');
     *     // => "json"
     *     this.types('application/json');
     *     // => "application/json"
     *
     *     // Accept: text/*, application/json
     *     this.types('image/png');
     *     this.types('png');
     *     // => undefined
     *
     *     // Accept: text/*;q=.5, application/json
     *     this.types(['html', 'json']);
     *     this.types('html', 'json');
     *     // => "json"
     *
     * @param {String|Array} types...
     * @return {String|Array|Boolean}
     * @public
     */
    public type: (types_: any, ...args: any[]) => string | any[] | boolean;
    public types(types_: any, ...args: any[]): string | any[] | boolean;
    /**
     * Return accepted encodings or best fit based on `encodings`.
     *
     * Given `Accept-Encoding: gzip, deflate`
     * an array sorted by quality is returned:
     *
     *     ['gzip', 'deflate']
     *
     * @param {String|Array} encodings...
     * @return {String|Array}
     * @public
     */
    public encoding: (encodings_: any, ...args: any[]) => string | any[];
    public encodings(encodings_: any, ...args: any[]): string | any[];
    /**
     * Return accepted charsets or best fit based on `charsets`.
     *
     * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
     * an array sorted by quality is returned:
     *
     *     ['utf-8', 'utf-7', 'iso-8859-1']
     *
     * @param {String|Array} charsets...
     * @return {String|Array}
     * @public
     */
    public charset: (charsets_: any, ...args: any[]) => string | any[];
    public charsets(charsets_: any, ...args: any[]): string | any[];
    /**
     * Return accepted languages or best fit based on `langs`.
     *
     * Given `Accept-Language: en;q=0.8, es, pt`
     * an array sorted by quality is returned:
     *
     *     ['es', 'pt', 'en']
     *
     * @param {String|Array} langs...
     * @return {Array|String}
     * @public
     */
    public lang: (languages_: any, ...args: any[]) => any[] | string;
    public langs: (languages_: any, ...args: any[]) => any[] | string;
    public language: (languages_: any, ...args: any[]) => any[] | string;
    public languages(languages_: any, ...args: any[]): any[] | string;
}
import Negotiator = require("negotiator");
