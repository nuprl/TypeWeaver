declare class HookMap {
    constructor(factory: any, name?: any);
    get(key: any): any;
    for(key: any): Hook;
    intercept(interceptor: any): void;
}
export default HookMap;
