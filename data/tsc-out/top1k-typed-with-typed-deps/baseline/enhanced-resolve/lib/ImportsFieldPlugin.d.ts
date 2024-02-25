export = ImportsFieldPlugin;
declare class ImportsFieldPlugin {
    /**
     * @param {string | ResolveStepHook} source source
     * @param {Set<string>} conditionNames condition names
     * @param {string | string[]} fieldNamePath name path
     * @param {string | ResolveStepHook} targetFile target file
     * @param {string | ResolveStepHook} targetPackage target package
     */
    constructor(source: string | import("./Resolver").ResolveStepHook, conditionNames: Set<string>, fieldNamePath: string | string[], targetFile: string | import("./Resolver").ResolveStepHook, targetPackage: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    targetFile: string | import("./Resolver").ResolveStepHook;
    targetPackage: string | import("./Resolver").ResolveStepHook;
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
declare namespace ImportsFieldPlugin {
    export { Resolver, ResolveStepHook, FieldProcessor, ImportsField };
}
type FieldProcessor = import("./util/entrypoints").FieldProcessor;
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
type ImportsField = import("./util/entrypoints").ImportsField;
