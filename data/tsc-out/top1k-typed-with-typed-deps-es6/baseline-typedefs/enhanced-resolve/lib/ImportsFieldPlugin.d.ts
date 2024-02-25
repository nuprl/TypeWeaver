export default class ImportsFieldPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, conditionNames: Set<string>, fieldNamePath: string | string[], targetFile: string | import("./Resolver").ResolveStepHook, targetPackage: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    targetFile: string | import("./Resolver").ResolveStepHook;
    targetPackage: string | import("./Resolver").ResolveStepHook;
    conditionNames: Set<string>;
    fieldName: string | string[];
    fieldProcessorCache: WeakMap<any, FieldProcessor>;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
export type FieldProcessor = import("./util/entrypoints").FieldProcessor;
export type ImportsField = import("./util/entrypoints").ImportsField;
