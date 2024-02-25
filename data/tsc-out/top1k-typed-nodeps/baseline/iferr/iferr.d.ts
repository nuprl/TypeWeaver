declare function _exports(fail: any, succ: any): (err: any, ...a: any[]) => any;
declare namespace _exports {
    export { iferr };
    export { tiferr };
    export { throwerr };
    export { printerr };
}
export = _exports;
declare function iferr(fail: any, succ: any): (err: any, ...a: any[]) => any;
declare function tiferr(fail: any, succ: any): (err: any, ...a: any[]) => any;
declare const throwerr: any;
declare function printerr(err: any, ...a: any[]): any;
