export default class RestrictionsPlugin {
    /**
     * @param {string | ResolveStepHook} source source
     * @param {Set<string | RegExp>} restrictions restrictions
     */
    constructor(source: string | import("./Resolver").ResolveStepHook, restrictions: Set<string | RegExp>);
    source: string | import("./Resolver").ResolveStepHook;
    restrictions: Set<string | RegExp>;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
