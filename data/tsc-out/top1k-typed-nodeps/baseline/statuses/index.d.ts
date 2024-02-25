export = status;
/**
 * Get the status code.
 *
 * Given a number, this will throw if it is not a known status
 * code, otherwise the code will be returned. Given a string,
 * the string will be parsed for a number and return the code
 * if valid, otherwise will lookup the code assuming this is
 * the status message.
 *
 * @param {string|number} code
 * @returns {number}
 * @public
 */
declare function status(code: string | number): number;
declare namespace status {
    export { codes as message };
    export const code: {};
    const codes_1: number[];
    export { codes_1 as codes };
    export const redirect: {
        300: boolean;
        301: boolean;
        302: boolean;
        303: boolean;
        305: boolean;
        307: boolean;
        308: boolean;
    };
    export const empty: {
        204: boolean;
        205: boolean;
        304: boolean;
    };
    export const retry: {
        502: boolean;
        503: boolean;
        504: boolean;
    };
}
