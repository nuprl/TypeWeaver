declare namespace _default {
    export const array: typeof import("./array");
    const _function: typeof import("./function");
    export { _function as function };
    export const map: typeof import("./map");
    export const object: typeof import("./object");
    export const set: typeof import("./set");
    export const string: typeof import("./string");
}
export default _default;
