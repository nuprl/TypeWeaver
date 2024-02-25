export default class UnsafeCachePlugin {
    /**
     * @param {string | ResolveStepHook} source source
     * @param {function(ResolveRequest): boolean} filterPredicate filterPredicate
     * @param {Cache} cache cache
     * @param {boolean} withContext withContext
     * @param {string | ResolveStepHook} target target
     */
    constructor(source: string | import("./Resolver").ResolveStepHook, filterPredicate: (arg0: ResolveRequest) => boolean, cache: Cache, withContext: boolean, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    filterPredicate: (arg0: ResolveRequest) => boolean;
    withContext: boolean;
    cache: Cache;
    target: string | import("./Resolver").ResolveStepHook;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveRequest = import("./Resolver").ResolveRequest;
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
export type Cache = {
    [k: string]: any;
};
