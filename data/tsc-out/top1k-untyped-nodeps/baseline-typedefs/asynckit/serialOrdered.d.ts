export = serialOrdered;
declare function serialOrdered(list: any[] | object, iterator: Function, sortMethod: Function, callback: Function): Function;
declare namespace serialOrdered {
    export { ascending, descending };
}
declare function ascending(a: mixed, b: mixed): number;
declare function descending(a: mixed, b: mixed): number;
