export default class ModulesInHierarchicalDirectoriesPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, directories: string | Array<string>, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    directories: string[];
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
