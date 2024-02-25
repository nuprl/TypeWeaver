export = ImportsFieldPlugin;
declare class ImportsFieldPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, conditionNames: Set<string>, fieldNamePath: string | string[], targetFile: string | import("./Resolver").ResolveStepHook, targetPackage: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    targetFile: string | import("./Resolver").ResolveStepHook;
    targetPackage: string | import("./Resolver").ResolveStepHook;
    conditionNames: Set<string>;
    fieldName: string | string[];
    fieldProcessorCache: WeakMap<any, FieldProcessor>;
    apply(resolver: Resolver): void;
}
declare namespace ImportsFieldPlugin {
    export { Resolver, ResolveStepHook, FieldProcessor, ImportsField };
}
type FieldProcessor = import("./util/entrypoints").FieldProcessor;
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
type ImportsField = import("./util/entrypoints").ImportsField;
