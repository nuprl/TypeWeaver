export = authorization;
/**
 * Return an "Authorization" header value with the given `options`
 * in the form of "AWS <key>:<signature>"
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */
declare function authorization(options: any): string;
declare namespace authorization {
    export { authorization, hmacSha1, sign, signQuery, stringToSign, queryStringToSign, canonicalizeHeaders, canonicalizeResource };
}
/**
 * Simple HMAC-SHA1 Wrapper
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */
declare function hmacSha1(options: any): string;
/**
 * Create a base64 sha1 HMAC for `options`.
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */
declare function sign(options: any): string;
/**
 * Create a base64 sha1 HMAC for `options`.
 *
 * Specifically to be used with S3 presigned URLs
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */
declare function signQuery(options: any): string;
/**
 * Return a string for sign() with the given `options`.
 *
 * Spec:
 *
 *    <verb>\n
 *    <md5>\n
 *    <content-type>\n
 *    <date>\n
 *    [headers\n]
 *    <resource>
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */
declare function stringToSign(options: any): string;
/**
 * Return a string for sign() with the given `options`, but is meant exclusively
 * for S3 presigned URLs
 *
 * Spec:
 *
 *    <date>\n
 *    <resource>
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */
declare function queryStringToSign(options: any): string;
/**
 * Perform the following:
 *
 *  - ignore non-amazon headers
 *  - lowercase fields
 *  - sort lexicographically
 *  - trim whitespace between ":"
 *  - join with newline
 *
 * @param {Object} headers
 * @return {String}
 * @api private
 */
declare function canonicalizeHeaders(headers: any): string;
/**
 * Perform the following:
 *
 *  - ignore non sub-resources
 *  - sort lexicographically
 *
 * @param {String} resource
 * @return {String}
 * @api private
 */
declare function canonicalizeResource(resource: string): string;
