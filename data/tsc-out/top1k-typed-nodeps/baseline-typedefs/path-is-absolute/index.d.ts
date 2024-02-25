declare function _exports(path: any): boolean;
declare namespace _exports {
    export { posix };
    export { win32 };
}
export = _exports;
declare function posix(path: any): boolean;
declare function win32(path: any): boolean;
