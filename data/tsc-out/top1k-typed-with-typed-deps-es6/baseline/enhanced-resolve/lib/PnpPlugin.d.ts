/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */
/**
 * @typedef {Object} PnpApiImpl
 * @property {function(string, string, object): string} resolveToUnqualified
 */
export default class PnpPlugin {
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
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
export type PnpApiImpl = {
    resolveToUnqualified: (arg0: string, arg1: string, arg2: object) => string;
};
