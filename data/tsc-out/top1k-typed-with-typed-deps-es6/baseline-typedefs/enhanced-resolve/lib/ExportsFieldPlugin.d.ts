export default class ExportsFieldPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, conditionNames: Set<string>, fieldNamePath: string | string[], target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    target: string | import("./Resolver").ResolveStepHook;
    conditionNames: Set<string>;
    fieldName: string | string[];
    fieldProcessorCache: WeakMap<any, FieldProcessor>;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
export type ExportsField = import("./util/entrypoints").ExportsField;
export type FieldProcessor = import("./util/entrypoints").FieldProcessor;
