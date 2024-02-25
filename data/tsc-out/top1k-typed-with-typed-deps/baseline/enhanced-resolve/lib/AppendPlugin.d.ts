export = AppendPlugin;
declare class AppendPlugin {
    /**
     * @param {string | ResolveStepHook} source source
     * @param {string} appending appending
     * @param {string | ResolveStepHook} target target
     */
    constructor(source: string | import("./Resolver").ResolveStepHook, appending: string, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    appending: string;
    target: string | import("./Resolver").ResolveStepHook;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver: Resolver): void;
}
declare namespace AppendPlugin {
    export { Resolver, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
