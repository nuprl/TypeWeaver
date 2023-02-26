declare class Resolver {
    static createStackEntry(hook: any, request: any): string;
    constructor(fileSystem: any, options: any);
    ensureHook(name: any): any;
    getHook(name: any): any;
    resolveSync(context: any, path: any, request: any): any;
    resolve(context: any, path: any, request: any, resolveContext: any, callback: any): any;
    doResolve(hook: any, request: any, message: any, resolveContext: any, callback: any): any;
    parse(identifier: any): {
        request: string;
        query: string;
        fragment: string;
        module: boolean;
        directory: boolean;
        file: boolean;
        internal: boolean;
    };
    isModule(path: any): boolean;
    isPrivate(path: any): boolean;
    isDirectory(path: any): any;
    join(path: any, request: any): any;
    normalize(path: any): any;
}
export default Resolver;
