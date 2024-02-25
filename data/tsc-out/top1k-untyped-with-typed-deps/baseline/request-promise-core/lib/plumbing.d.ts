declare function _exports(options: any): {
    init(requestOptions: any): void;
    defaultTransformations: {
        HEAD: (body: any, response: any, resolveWithFullResponse: any) => any;
    };
    callback(err: any, response: any, body: any, ...args: any[]): void;
    exposePromiseMethod(exposeTo: any, bindTo: any, promisePropertyKey: any, methodToExpose: any, exposeAs: any): void;
    exposePromise(exposeTo: any, bindTo: any, promisePropertyKey: any, exposeAs: any): void;
};
export = _exports;
