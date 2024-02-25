export default memoize;
declare function memoize(func: Function, resolver?: Function): Function;
declare namespace memoize {
    const Cache: MapConstructor;
}
