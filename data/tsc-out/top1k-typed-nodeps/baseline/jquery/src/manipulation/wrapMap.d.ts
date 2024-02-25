export default wrapMap;
declare namespace wrapMap {
    export const tbody: string[];
    export const tfoot: string[];
    export const colgroup: string[];
    import caption = wrapMap.thead;
    export { caption };
    import th = wrapMap.td;
    export { th };
}
