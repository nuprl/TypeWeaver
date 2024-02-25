export = parseurl;
/**
 * Parse the `req` url with memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @public
 */
declare function parseurl(req: ServerRequest): any;
declare namespace parseurl {
    export { originalurl as original };
}
/**
 * Parse the `req` original url with fallback and memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @public
 */
declare function originalurl(req: ServerRequest): any;
