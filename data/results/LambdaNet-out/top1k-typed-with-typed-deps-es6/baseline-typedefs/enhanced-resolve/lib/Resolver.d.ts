declare class Resolver {
    static createStackEntry(hook: any, request: any): string;
    constructor(fileSystem: any, options: any);
    ensureHook(name: any): any;
    getHook(name: any): any;
    resolveSync(context: any, path: any, request: any): string;
    resolve(context: any, path: any, request: any, resolveContext: any, callback: any): any;
    doResolve(hook: any, request: any, message: any, resolveContext: any, callback: any): any;
    parse(identifier: any): object;
    isModule(path: any): boolean;
    isPrivate(path: any): boolean;
    isDirectory(path: any): any;
    join(path: any, request: any): any;
    normalize(path: any): any;
}
export default Resolver;
