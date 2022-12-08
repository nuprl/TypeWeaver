declare function memoizeCapped(func: Function): {
    (...args: any[]): any;
    cache: Map<any, any>;
};
export default memoizeCapped;
