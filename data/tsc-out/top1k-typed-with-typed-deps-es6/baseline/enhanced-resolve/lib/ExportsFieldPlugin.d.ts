/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */
/** @typedef {import("./util/entrypoints").ExportsField} ExportsField */
/** @typedef {import("./util/entrypoints").FieldProcessor} FieldProcessor */
export default class ExportsFieldPlugin {
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
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
export type ExportsField = import("./util/entrypoints").ExportsField;
export type FieldProcessor = import("./util/entrypoints").FieldProcessor;
