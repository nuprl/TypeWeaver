export = RootsPlugin;
declare class RootsPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, roots: Set<string>, target: string | import("./Resolver").ResolveStepHook);
    roots: string[];
    source: string | import("./Resolver").ResolveStepHook;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace RootsPlugin {
    export { Resolver, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
