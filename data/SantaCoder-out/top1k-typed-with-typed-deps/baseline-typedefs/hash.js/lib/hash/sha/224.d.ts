declare var utils: any;
declare var SHA256: any;
declare function SHA224(): any;
declare namespace SHA224 {
    var blockSize: number;
    var outSize: number;
    var hmacStrength: number;
    var padLength: number;
}
