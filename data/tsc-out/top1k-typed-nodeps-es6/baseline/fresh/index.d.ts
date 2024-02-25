export default fresh;
/**
 * Check freshness of the response using request and response headers.
 *
 * @param {Object} reqHeaders
 * @param {Object} resHeaders
 * @return {Boolean}
 * @public
 */
declare function fresh(reqHeaders: any, resHeaders: any): boolean;
