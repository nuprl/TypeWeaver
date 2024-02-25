export default class AliasPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, options: AliasOption | Array<AliasOption>, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    options: AliasOption[];
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveRequest = import("./Resolver").ResolveRequest;
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
export type AliasOption = {
    alias: string | Array<string> | false;
    name: string;
    onlyModule?: boolean;
};
