export default class MainFieldPlugin {
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
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
export type MainFieldOptions = {
    name: string | Array<string>;
    forceRelative: boolean;
};
