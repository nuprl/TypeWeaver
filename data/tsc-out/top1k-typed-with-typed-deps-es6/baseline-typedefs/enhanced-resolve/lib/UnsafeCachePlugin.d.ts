export default class UnsafeCachePlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, filterPredicate: (arg0: ResolveRequest) => boolean, cache: Cache, withContext: boolean, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    filterPredicate: (arg0: ResolveRequest) => boolean;
    withContext: boolean;
    cache: Cache;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveRequest = import("./Resolver").ResolveRequest;
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
export type Cache = {
    [k: string]: any;
};
