export = DescriptionFilePlugin;
declare class DescriptionFilePlugin {
    /**
     * @param {string | ResolveStepHook} source source
     * @param {string[]} filenames filenames
     * @param {boolean} pathIsFile pathIsFile
     * @param {string | ResolveStepHook} target target
     */
    constructor(source: string | import("./Resolver").ResolveStepHook, filenames: string[], pathIsFile: boolean, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    filenames: string[];
    pathIsFile: boolean;
    target: string | import("./Resolver").ResolveStepHook;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver: Resolver): void;
}
declare namespace DescriptionFilePlugin {
    export { Resolver, ResolveStepHook };
}
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
