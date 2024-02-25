export = UnsafeCachePlugin;
declare class UnsafeCachePlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, filterPredicate: (arg0: ResolveRequest) => boolean, cache: Cache, withContext: boolean, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    filterPredicate: (arg0: ResolveRequest) => boolean;
    withContext: boolean;
    cache: Cache;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace UnsafeCachePlugin {
    export { Resolver, ResolveRequest, ResolveStepHook, Cache };
}
type ResolveRequest = import("./Resolver").ResolveRequest;
type Cache = {
    [k: string]: any;
};
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
