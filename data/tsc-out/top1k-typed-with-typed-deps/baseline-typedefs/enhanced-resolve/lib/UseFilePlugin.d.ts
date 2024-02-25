export = UseFilePlugin;
declare class UseFilePlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, filename: string, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    filename: string;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace UseFilePlugin {
    export { Resolver, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
