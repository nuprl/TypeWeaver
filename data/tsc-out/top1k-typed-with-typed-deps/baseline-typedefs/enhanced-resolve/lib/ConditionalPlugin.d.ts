export = ConditionalPlugin;
declare class ConditionalPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, test: Partial<ResolveRequest>, message: string | null, allowAlternatives: boolean, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    test: Partial<import("./Resolver").ResolveRequest>;
    message: string;
    allowAlternatives: boolean;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace ConditionalPlugin {
    export { Resolver, ResolveRequest, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveRequest = import("./Resolver").ResolveRequest;
type ResolveStepHook = import("./Resolver").ResolveStepHook;
