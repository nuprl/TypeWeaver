export = AliasPlugin;
declare class AliasPlugin {
    /**
     * @param {string | ResolveStepHook} source source
     * @param {AliasOption | Array<AliasOption>} options options
     * @param {string | ResolveStepHook} target target
     */
    constructor(source: string | import("./Resolver").ResolveStepHook, options: AliasOption | Array<AliasOption>, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    options: AliasOption[];
    target: string | import("./Resolver").ResolveStepHook;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
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
