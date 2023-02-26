declare function SHA1(): any;
declare namespace SHA1 {
    var blockSize: number;
    var outSize: number;
    var hmacStrength: number;
    var padLength: number;
}
export default SHA1;
