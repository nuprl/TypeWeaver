export = ExtensionAliasPlugin;
declare class ExtensionAliasPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, options: ExtensionAliasOption, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    options: ExtensionAliasOption;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace ExtensionAliasPlugin {
    export { Resolver, ResolveRequest, ResolveStepHook, ExtensionAliasOption };
}
type ExtensionAliasOption = {
    alias: string | string[];
    extension: string;
};
type Resolver = import("./Resolver");
type ResolveRequest = import("./Resolver").ResolveRequest;
type ResolveStepHook = import("./Resolver").ResolveStepHook;
