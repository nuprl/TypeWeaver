declare var utils: string;
declare var SHA256: Function;
declare function SHA224(): string;
declare namespace SHA224 {
    var blockSize: number;
    var outSize: number;
    var hmacStrength: number;
    var padLength: number;
}
