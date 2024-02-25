export default class RestrictionsPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, restrictions: Set<string | RegExp>);
    source: string | import("./Resolver").ResolveStepHook;
    restrictions: Set<string | RegExp>;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
