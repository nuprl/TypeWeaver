declare function SHA512(): string;
declare namespace SHA512 {
    var blockSize: number;
    var outSize: number;
    var hmacStrength: number;
    var padLength: number;
}
export default SHA512;
