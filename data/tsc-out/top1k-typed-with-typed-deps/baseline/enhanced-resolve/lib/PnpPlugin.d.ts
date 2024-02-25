export = PnpPlugin;
declare class PnpPlugin {
    /**
     * @param {string | ResolveStepHook} source source
     * @param {PnpApiImpl} pnpApi pnpApi
     * @param {string | ResolveStepHook} target target
     */
    constructor(source: string | import("./Resolver").ResolveStepHook, pnpApi: PnpApiImpl, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    pnpApi: PnpApiImpl;
    target: string | import("./Resolver").ResolveStepHook;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver: Resolver): void;
}
declare namespace PnpPlugin {
    export { Resolver, ResolveStepHook, PnpApiImpl };
}
type PnpApiImpl = {
    resolveToUnqualified: (arg0: string, arg1: string, arg2: object) => string;
};
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
