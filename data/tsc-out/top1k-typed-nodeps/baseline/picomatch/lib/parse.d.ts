export = parse;
/**
 * Parse the given input string.
 * @param {String} input
 * @param {Object} options
 * @return {Object}
 */
declare function parse(input: string, options: any): any;
declare namespace parse {
    /**
     * Fast paths for creating regular expressions for common glob patterns.
     * This can significantly speed up processing and has very little downside
     * impact when none of the fast paths match.
     */
    function fastpaths(input: any, options: any): any;
}
