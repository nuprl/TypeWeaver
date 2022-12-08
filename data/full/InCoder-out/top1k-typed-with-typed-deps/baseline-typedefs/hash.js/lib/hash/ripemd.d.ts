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
declare function f(j: number, x: number, y: number, z: number): number;
declare function K(j: number): 0 | 1518500249 | 1859775393 | 2400959708 | 2840853838;
declare function Kh(j: number): 0 | 1352829926 | 1548603684 | 1836072691 | 2053994217;
declare var r: number[];
declare var rh: number[];
declare var s: number[];
declare var sh: number[];
