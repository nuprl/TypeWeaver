export default class SelfReferencePlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, fieldNamePath: string | string[], target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    target: string | import("./Resolver").ResolveStepHook;
    fieldName: string | string[];
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
