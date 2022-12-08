declare var utils: any;
declare var common: any;
declare var rotl32: any;
declare var sum32: any;
declare var sum32_3: any;
declare var sum32_4: any;
declare var BlockHash: any;
declare function RIPEMD160(): any;
declare namespace RIPEMD160 {
    var blockSize: number;
    var outSize: number;
    var hmacStrength: number;
    var padLength: number;
}
declare function f(j: number, x: number, y: number, z: number): boolean;
declare function K(j: number): any;
declare function Kh(j: number): number;
declare var r: number[];
declare var rh: number[];
declare var s: number[];
declare var sh: number[];
