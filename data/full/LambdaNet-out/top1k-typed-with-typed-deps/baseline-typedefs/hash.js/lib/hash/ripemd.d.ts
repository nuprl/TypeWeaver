declare var utils: any[];
declare var common: string;
declare var rotl32: object;
declare var sum32: Function;
declare var sum32_3: object;
declare var sum32_4: Function;
declare var BlockHash: Function;
declare function RIPEMD160(): string;
declare namespace RIPEMD160 {
    var blockSize: number;
    var outSize: number;
    var hmacStrength: number;
    var padLength: number;
}
declare function f(j: number, x: number, y: number, z: number): number;
declare function K(j: number): number;
declare function Kh(j: number): number;
declare var r: Promise;
declare var rh: Promise;
declare var s: Promise;
declare var sh: Promise;
