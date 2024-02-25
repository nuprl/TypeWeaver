export default Axios;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
declare class Axios {
    constructor(instanceConfig: any);
    defaults: any;
    interceptors: {
        request: InterceptorManager;
        response: InterceptorManager;
    };
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    request(configOrUrl: string | any, config: any | null): Promise<any>;
    getUri(config: any): string;
}
import InterceptorManager from "./InterceptorManager.js";
