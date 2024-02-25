export = RestrictionsPlugin;
declare class RestrictionsPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, restrictions: Set<string | RegExp>);
    source: string | import("./Resolver").ResolveStepHook;
    restrictions: Set<string | RegExp>;
    apply(resolver: Resolver): void;
}
declare namespace RestrictionsPlugin {
    export { Resolver, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
