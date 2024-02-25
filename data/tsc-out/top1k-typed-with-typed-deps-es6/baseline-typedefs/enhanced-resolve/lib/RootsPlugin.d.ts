export default RootsPlugin;
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
declare class RootsPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, roots: Set<string>, target: string | import("./Resolver").ResolveStepHook);
    roots: string[];
    source: string | import("./Resolver").ResolveStepHook;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
