export { RIPEMD160 as ripemd160 };
declare function RIPEMD160(): RIPEMD160;
declare class RIPEMD160 {
    h: number[];
    endian: string;
    _update(msg: any, start: any): void;
    _digest(enc: any): string | any[];
}
declare namespace RIPEMD160 {
    const blockSize: number;
    const outSize: number;
    const hmacStrength: number;
    const padLength: number;
}
