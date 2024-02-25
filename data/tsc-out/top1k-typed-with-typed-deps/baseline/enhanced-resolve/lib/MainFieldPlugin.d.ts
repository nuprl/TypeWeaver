export = MainFieldPlugin;
declare class MainFieldPlugin {
    /**
     * @param {string | ResolveStepHook} source source
     * @param {MainFieldOptions} options options
     * @param {string | ResolveStepHook} target target
     */
    constructor(source: string | import("./Resolver").ResolveStepHook, options: MainFieldOptions, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    options: MainFieldOptions;
    target: string | import("./Resolver").ResolveStepHook;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
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
