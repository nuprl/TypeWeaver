export default class ParsePlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, requestOptions: Partial<ResolveRequest>, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    requestOptions: Partial<import("./Resolver").ResolveRequest>;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveRequest = import("./Resolver").ResolveRequest;
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
