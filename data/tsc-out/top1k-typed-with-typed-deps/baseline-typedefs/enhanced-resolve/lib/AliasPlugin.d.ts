export = AliasPlugin;
declare class AliasPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, options: AliasOption | Array<AliasOption>, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    options: AliasOption[];
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace AliasPlugin {
    export { Resolver, ResolveRequest, ResolveStepHook, AliasOption };
}
type AliasOption = {
    alias: string | Array<string> | false;
    name: string;
    onlyModule?: boolean;
};
type Resolver = import("./Resolver");
type ResolveRequest = import("./Resolver").ResolveRequest;
type ResolveStepHook = import("./Resolver").ResolveStepHook;
