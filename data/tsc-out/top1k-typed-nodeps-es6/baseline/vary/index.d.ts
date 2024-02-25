export = vary;
/**
 * Mark that a request is varied on a header field.
 *
 * @param {Object} res
 * @param {String|Array} field
 * @public
 */
declare function vary(res: any, field: string | any[]): void;
declare namespace vary {
    export { append };
}
/**
 * Append a field to a vary header.
 *
 * @param {String} header
 * @param {String|Array} field
 * @return {String}
 * @public
 */
declare function append(header: string, field: string | any[]): string;
