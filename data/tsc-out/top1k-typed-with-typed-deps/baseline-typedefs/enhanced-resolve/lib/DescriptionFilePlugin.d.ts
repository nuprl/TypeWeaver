export = DescriptionFilePlugin;
declare class DescriptionFilePlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, filenames: string[], pathIsFile: boolean, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    filenames: string[];
    pathIsFile: boolean;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace DescriptionFilePlugin {
    export { Resolver, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
