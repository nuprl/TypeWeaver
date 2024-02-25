export default SHA256;
declare function SHA256(): SHA256;
declare class SHA256 {
    h: number[];
    k: number[];
    W: any[];
    _update(msg: any, start: any): void;
    _digest(enc: any): any;
}
declare namespace SHA256 {
    const blockSize: number;
    const outSize: number;
    const hmacStrength: number;
    const padLength: number;
}
