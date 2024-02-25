export = ResultPlugin;
declare class ResultPlugin {
    constructor(source: import("./Resolver").ResolveStepHook);
    source: import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace ResultPlugin {
    export { Resolver, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
