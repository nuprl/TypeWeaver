import httpAdapter from './http.js';
import xhrAdapter from './xhr.js';
declare const _default: {
    getAdapter: (nameOrAdapter: any) => any;
    adapters: {
        http: typeof httpAdapter;
        xhr: typeof xhrAdapter;
    };
};
export default _default;
