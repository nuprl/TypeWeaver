export = ExportsFieldPlugin;
declare class ExportsFieldPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, conditionNames: Set<string>, fieldNamePath: string | string[], target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    target: string | import("./Resolver").ResolveStepHook;
    conditionNames: Set<string>;
    fieldName: string | string[];
    fieldProcessorCache: WeakMap<any, FieldProcessor>;
    apply(resolver: Resolver): void;
}
declare namespace ExportsFieldPlugin {
    export { Resolver, ResolveStepHook, ExportsField, FieldProcessor };
}
type FieldProcessor = import("./util/entrypoints").FieldProcessor;
type Resolver = import("./Resolver");
type ResolveStepHook = import("./Resolver").ResolveStepHook;
type ExportsField = import("./util/entrypoints").ExportsField;
