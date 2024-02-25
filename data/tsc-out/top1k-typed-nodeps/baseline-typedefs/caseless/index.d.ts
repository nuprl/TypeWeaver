declare function _exports(dict: any): Caseless;
declare namespace _exports {
    function httpify(resp: any, headers: any): Caseless;
}
export = _exports;
declare function Caseless(dict: any): void;
declare class Caseless {
    constructor(dict: any);
    dict: any;
    set(name: any, value: any, clobber: any): string | false;
    has(name: any): string | false;
    get(name: any): undefined;
    swap(name: any): void;
    del(name: any): boolean;
}
