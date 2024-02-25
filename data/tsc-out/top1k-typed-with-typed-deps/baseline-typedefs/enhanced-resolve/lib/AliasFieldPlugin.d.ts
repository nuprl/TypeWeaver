export = AliasFieldPlugin;
declare class AliasFieldPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, field: string | Array<string>, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    field: string | string[];
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace AliasFieldPlugin {
    export { Resolver, ResolveRequest, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveRequest = import("./Resolver").ResolveRequest;
type ResolveStepHook = import("./Resolver").ResolveStepHook;
