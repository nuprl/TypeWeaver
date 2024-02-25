export = MainFieldPlugin;
declare class MainFieldPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, options: MainFieldOptions, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    options: MainFieldOptions;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
declare namespace MainFieldPlugin {
    export { Resolver, ResolveStepHook, MainFieldOptions };
}
type MainFieldOptions = {
    name: string | Array<string>;
    forceRelative: boolean;
};
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
