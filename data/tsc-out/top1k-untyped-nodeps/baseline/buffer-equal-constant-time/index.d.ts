export = bufferEq;
declare function bufferEq(a: any, b: any): boolean;
declare namespace bufferEq {
    function install(): void;
    function restore(): void;
}
