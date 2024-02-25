export namespace charsets {
    export { charset as lookup };
}
export const extensions: any;
export const types: any;
/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */
export function charset(type: string): boolean | string;
/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */
export function contentType(str: string): boolean | string;
/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */
export function extension(type: string): boolean | string;
/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {boolean|string}
 */
export function lookup(path: string): boolean | string;
