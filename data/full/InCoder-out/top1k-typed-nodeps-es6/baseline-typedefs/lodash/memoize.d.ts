declare function memoize(func: Function, resolver: Function): {
    (...args: any[]): any;
    cache: Map<any, any>;
};
declare namespace memoize {
    var Cache: MapConstructor;
}
export default memoize;
