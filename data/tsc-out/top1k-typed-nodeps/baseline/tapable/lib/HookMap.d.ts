export = HookMap;
declare class HookMap {
    constructor(factory: any, name?: any);
    _map: Map<any, any>;
    name: any;
    _factory: any;
    _interceptors: any[];
    get(key: any): any;
    for(key: any): any;
    intercept(interceptor: any): void;
    tap: (key: any, options: any, fn: any) => any;
    tapAsync: (key: any, options: any, fn: any) => any;
    tapPromise: (key: any, options: any, fn: any) => any;
}
