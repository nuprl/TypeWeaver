export = SHA224;
declare function SHA224(): SHA224;
declare class SHA224 {
    h: number[];
    _digest(enc: any): string | any[];
}
declare namespace SHA224 {
    const blockSize: number;
    const outSize: number;
    const hmacStrength: number;
    const padLength: number;
}
