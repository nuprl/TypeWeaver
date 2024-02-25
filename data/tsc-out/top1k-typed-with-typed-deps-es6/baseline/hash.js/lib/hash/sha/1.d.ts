export default SHA1;
declare function SHA1(): SHA1;
declare class SHA1 {
    h: number[];
    W: any[];
    _update(msg: any, start: any): void;
    _digest(enc: any): any;
}
declare namespace SHA1 {
    const blockSize: number;
    const outSize: number;
    const hmacStrength: number;
    const padLength: number;
}
