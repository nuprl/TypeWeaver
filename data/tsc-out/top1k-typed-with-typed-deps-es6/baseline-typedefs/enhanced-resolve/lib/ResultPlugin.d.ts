export default class ResultPlugin {
    constructor(source: import("./Resolver").ResolveStepHook);
    source: import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
