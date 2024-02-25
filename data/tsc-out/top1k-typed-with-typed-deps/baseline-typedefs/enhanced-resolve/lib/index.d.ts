declare const _exports: typeof resolve & {
    readonly sync: typeof resolveSync;
    create: typeof create & {
        readonly sync: typeof createSync;
    };
    ResolverFactory: typeof ResolverFactory;
    CachedInputFileSystem: typeof CachedInputFileSystem;
    readonly CloneBasenamePlugin: typeof import("./CloneBasenamePlugin");
    readonly LogInfoPlugin: typeof import("./LogInfoPlugin");
    readonly forEachBail: typeof import("./forEachBail");
};
export = _exports;
export type PnpApi = import("./PnpPlugin").PnpApiImpl;
export type Resolver = import("./Resolver");
export type FileSystem = import("./Resolver").FileSystem;
export type ResolveContext = import("./Resolver").ResolveContext;
export type ResolveRequest = import("./Resolver").ResolveRequest;
export type Plugin = import("./ResolverFactory").Plugin;
export type ResolveOptions = import("./ResolverFactory").UserResolveOptions;
declare function resolve(context: any, path: any, request: any, resolveContext: any, callback: any): void;
declare function resolveSync(context: any, path: any, request: any): string | false;
declare function create(options: any): (context: any, path: any, request: any, resolveContext: any, callback: any) => void;
declare function createSync(options: any): (context: any, path: any, request: any) => string | false;
import ResolverFactory = require("./ResolverFactory");
import CachedInputFileSystem = require("./CachedInputFileSystem");
