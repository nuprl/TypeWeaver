export default class UseFilePlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, filename: string, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    filename: string;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
