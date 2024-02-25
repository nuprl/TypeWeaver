export = SHA512;
declare function SHA512(): SHA512;
declare class SHA512 {
    h: number[];
    k: number[];
    W: any[];
    _prepareBlock(msg: any, start: any): void;
    _update(msg: any, start: any): void;
    _digest(enc: any): string | any[];
}
declare namespace SHA512 {
    const blockSize: number;
    const outSize: number;
    const hmacStrength: number;
    const padLength: number;
}
