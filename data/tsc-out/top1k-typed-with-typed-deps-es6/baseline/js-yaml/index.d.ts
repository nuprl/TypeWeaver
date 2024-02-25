export const Type: typeof import("./lib/type");
export const Schema: typeof import("./lib/schema");
export const FAILSAFE_SCHEMA: typeof import("./lib/schema/failsafe");
export const JSON_SCHEMA: typeof import("./lib/schema/json");
export const CORE_SCHEMA: typeof import("./lib/schema/core");
export const DEFAULT_SCHEMA: typeof import("./lib/schema/default");
export const load: any;
export const loadAll: any;
export const dump: any;
export const YAMLException: typeof import("./lib/exception");
export namespace types {
    export const binary: typeof import("./lib/type/binary");
    export const float: typeof import("./lib/type/float");
    export const map: typeof import("./lib/type/map");
    const _null: typeof import("./lib/type/null");
    export { _null as null };
    export const pairs: typeof import("./lib/type/pairs");
    export const set: typeof import("./lib/type/set");
    export const timestamp: typeof import("./lib/type/timestamp");
    export const bool: typeof import("./lib/type/bool");
    export const int: typeof import("./lib/type/int");
    export const merge: typeof import("./lib/type/merge");
    export const omap: typeof import("./lib/type/omap");
    export const seq: typeof import("./lib/type/seq");
    export const str: typeof import("./lib/type/str");
}
export function safeLoad(): never;
export function safeLoadAll(): never;
export function safeDump(): never;
