export = ParsePlugin;
declare class ParsePlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, requestOptions: Partial<ResolveRequest>, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    requestOptions: Partial<import("./Resolver").ResolveRequest>;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace ParsePlugin {
    export { Resolver, ResolveRequest, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveRequest = import("./Resolver").ResolveRequest;
type ResolveStepHook = import("./Resolver").ResolveStepHook;
