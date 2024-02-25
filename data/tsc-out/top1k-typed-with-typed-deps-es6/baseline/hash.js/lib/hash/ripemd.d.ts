export const ripemd160: typeof RIPEMD160;
declare function RIPEMD160(): RIPEMD160;
declare class RIPEMD160 {
    h: number[];
    endian: string;
    _update(msg: any, start: any): void;
    _digest(enc: any): any;
}
declare namespace RIPEMD160 {
    const blockSize: number;
    const outSize: number;
    const hmacStrength: number;
    const padLength: number;
}
export {};
