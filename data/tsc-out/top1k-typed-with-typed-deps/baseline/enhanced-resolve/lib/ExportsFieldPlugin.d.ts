export = ExportsFieldPlugin;
declare class ExportsFieldPlugin {
    /**
     * @param {string | ResolveStepHook} source source
     * @param {Set<string>} conditionNames condition names
     * @param {string | string[]} fieldNamePath name path
     * @param {string | ResolveStepHook} target target
     */
    constructor(source: string | import("./Resolver").ResolveStepHook, conditionNames: Set<string>, fieldNamePath: string | string[], target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    target: string | import("./Resolver").ResolveStepHook;
    conditionNames: Set<string>;
    fieldName: string | string[];
    /** @type {WeakMap<any, FieldProcessor>} */
    fieldProcessorCache: WeakMap<any, FieldProcessor>;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver: Resolver): void;
}
declare namespace ExportsFieldPlugin {
    export { Resolver, ResolveStepHook, ExportsField, FieldProcessor };
}
type FieldProcessor = import("./util/entrypoints").FieldProcessor;
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
type ExportsField = import("./util/entrypoints").ExportsField;
