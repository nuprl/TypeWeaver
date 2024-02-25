export = assert;
declare function assert(val: any, msg: any): void;
declare namespace assert {
    function equal(l: any, r: any, msg: any): void;
}
