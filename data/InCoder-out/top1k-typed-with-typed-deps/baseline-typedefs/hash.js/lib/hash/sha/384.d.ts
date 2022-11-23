declare var utils: any;
declare var SHA512: any;
declare function SHA384(): any;
declare namespace SHA384 {
    var blockSize: number;
    var outSize: number;
    var hmacStrength: number;
    var padLength: number;
}
