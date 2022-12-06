declare function SHA224(): string;
declare namespace SHA224 {
    var blockSize: number;
    var outSize: number;
    var hmacStrength: number;
    var padLength: number;
}
export default SHA224;
