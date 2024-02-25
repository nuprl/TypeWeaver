declare namespace _default {
    export { decode as parse };
    export { decode };
    export { encode as stringify };
    export { encode };
    export { safe };
    export { unsafe };
}
export default _default;
declare function decode(str: any): any;
declare function encode(obj: any, opt: any): string;
declare function safe(val: any): string;
declare function unsafe(val: any, doUnesc: any): any;
