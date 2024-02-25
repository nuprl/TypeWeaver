export default class AliasFieldPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, field: string | Array<string>, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    field: string | string[];
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveRequest = import("./Resolver").ResolveRequest;
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
