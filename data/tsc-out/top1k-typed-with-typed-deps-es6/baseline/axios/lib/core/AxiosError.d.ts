export default AxiosError;
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
declare function AxiosError(message: string, code?: string, config?: any, request?: any, response?: any): Error;
declare class AxiosError {
    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [config] The config.
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     *
     * @returns {Error} The created error.
     */
    constructor(message: string, code?: string, config?: any, request?: any, response?: any);
    stack: string;
    message: string;
    name: string;
    code: string;
    config: any;
    request: any;
    response: any;
}
declare namespace AxiosError {
    function from(error: any, code: any, config: any, request: any, response: any, customProps: any): any;
}
