export default runAsync;
declare function runAsync(func: Function, cb: Function): Function;
declare namespace runAsync {
    function cb(func: any, cb: any): Function;
}
