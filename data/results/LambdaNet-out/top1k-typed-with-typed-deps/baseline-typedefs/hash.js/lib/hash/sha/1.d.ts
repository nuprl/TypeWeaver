declare var utils: any[];
declare var common: string;
declare var shaCommon: string;
declare var rotl32: object;
declare var sum32: object;
declare var sum32_5: Function;
declare var ft_1: Function;
declare var BlockHash: Function;
declare var sha1_K: any[];
declare function SHA1(): string;
declare namespace SHA1 {
    var blockSize: number;
    var outSize: number;
    var hmacStrength: number;
    var padLength: number;
}
