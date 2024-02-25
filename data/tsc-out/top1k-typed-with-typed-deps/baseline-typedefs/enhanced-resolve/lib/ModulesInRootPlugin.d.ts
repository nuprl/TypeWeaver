export = ModulesInRootPlugin;
declare class ModulesInRootPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, path: string, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    path: string;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace ModulesInRootPlugin {
    export { Resolver, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
