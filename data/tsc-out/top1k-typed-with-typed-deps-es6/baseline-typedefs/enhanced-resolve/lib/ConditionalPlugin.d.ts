export default class ConditionalPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, test: Partial<ResolveRequest>, message: string | null, allowAlternatives: boolean, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    test: Partial<import("./Resolver").ResolveRequest>;
    message: string;
    allowAlternatives: boolean;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveRequest = import("./Resolver").ResolveRequest;
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
