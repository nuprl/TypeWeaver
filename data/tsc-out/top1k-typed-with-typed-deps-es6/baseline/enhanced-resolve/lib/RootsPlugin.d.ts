export default RootsPlugin;
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */
declare class RootsPlugin {
    /**
     * @param {string | ResolveStepHook} source source hook
     * @param {Set<string>} roots roots
     * @param {string | ResolveStepHook} target target hook
     */
    constructor(source: string | import("./Resolver").ResolveStepHook, roots: Set<string>, target: string | import("./Resolver").ResolveStepHook);
    roots: string[];
    source: string | import("./Resolver").ResolveStepHook;
    target: string | import("./Resolver").ResolveStepHook;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver: Resolver): void;
}
