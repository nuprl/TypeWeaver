declare const util: any;
declare const defaultFactory: (key: any, hook: any) => any;
declare class HookMap {
    constructor(factory: any, name?: any);
    get(key: any): any;
    for(key: any): any;
    intercept(interceptor: any): void;
}
