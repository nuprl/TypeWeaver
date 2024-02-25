export = ModulesInHierarchicalDirectoriesPlugin;
declare class ModulesInHierarchicalDirectoriesPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, directories: string | Array<string>, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    directories: string[];
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace ModulesInHierarchicalDirectoriesPlugin {
    export { Resolver, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
