export { axios_1 as default };
declare var axios_1: Axios;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
declare function Axios(instanceConfig: any): void;
declare class Axios {
    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     */
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
     */
    request(configOrUrl: string | any, config: any | null): Promise<any>;
    getUri(config: any): string;
}
declare function InterceptorManager(): void;
declare class InterceptorManager {
    handlers: any[];
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled: Function, rejected: Function, options: any): number;
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     */
    eject(id: number): void;
    /**
     * Clear all interceptors from the stack
     */
    clear(): void;
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     */
    forEach(fn: Function): void;
}
