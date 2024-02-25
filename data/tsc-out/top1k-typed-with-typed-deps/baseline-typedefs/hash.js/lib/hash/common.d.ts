export function BlockHash(): void;
export class BlockHash {
    pending: any;
    pendingTotal: number;
    blockSize: any;
    outSize: any;
    hmacStrength: any;
    padLength: number;
    endian: string;
    _delta8: number;
    _delta32: number;
    update(msg: any, enc: any): BlockHash;
    digest(enc: any): any;
    _pad(): any[];
}
