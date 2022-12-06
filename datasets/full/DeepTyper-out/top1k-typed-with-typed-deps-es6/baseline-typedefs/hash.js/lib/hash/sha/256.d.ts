declare function SHA256(): any;
declare namespace SHA256 {
    var blockSize: number;
    var outSize: number;
    var hmacStrength: number;
    var padLength: number;
}
export default SHA256;
