declare function RIPEMD160(): any;
declare namespace RIPEMD160 {
    var blockSize: number;
    var outSize: number;
    var hmacStrength: number;
    var padLength: number;
}
export declare const ripemd160: typeof RIPEMD160;
export {};
