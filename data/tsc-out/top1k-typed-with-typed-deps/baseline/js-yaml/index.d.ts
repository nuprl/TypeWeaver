export const Type: typeof import("./lib/type");
export const Schema: typeof import("./lib/schema");
export const FAILSAFE_SCHEMA: import("./lib/schema");
export const JSON_SCHEMA: any;
export const CORE_SCHEMA: any;
export const DEFAULT_SCHEMA: any;
export const YAMLException: typeof import("./lib/exception");
export namespace types {
    export const binary: import("./lib/type");
    export const float: import("./lib/type");
    export const map: import("./lib/type");
    const _null: import("./lib/type");
    export { _null as null };
    export const pairs: import("./lib/type");
    export const set: import("./lib/type");
    export const timestamp: import("./lib/type");
    export const bool: import("./lib/type");
    export const int: import("./lib/type");
    export const merge: import("./lib/type");
    export const omap: import("./lib/type");
    export const seq: import("./lib/type");
    export const str: import("./lib/type");
}
export function safeLoad(): never;
export function safeLoadAll(): never;
export function safeDump(): never;
export { load, loadAll, dump };
