export = FileExistsPlugin;
declare class FileExistsPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace FileExistsPlugin {
    export { Resolver, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
