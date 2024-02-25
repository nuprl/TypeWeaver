export = SelfReferencePlugin;
declare class SelfReferencePlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, fieldNamePath: string | string[], target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    target: string | import("./Resolver").ResolveStepHook;
    fieldName: string | string[];
    apply(resolver: Resolver): void;
}
declare namespace SelfReferencePlugin {
    export { Resolver, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
