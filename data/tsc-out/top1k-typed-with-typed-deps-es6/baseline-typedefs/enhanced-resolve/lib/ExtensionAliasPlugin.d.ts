export default class ExtensionAliasPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, options: ExtensionAliasOption, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    options: ExtensionAliasOption;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveRequest = import("./Resolver").ResolveRequest;
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
export type ExtensionAliasOption = {
    alias: string | string[];
    extension: string;
};
