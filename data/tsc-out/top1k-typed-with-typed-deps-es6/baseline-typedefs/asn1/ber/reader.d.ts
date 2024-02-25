export default Reader;
declare function Reader(data: any): void;
declare class Reader {
    constructor(data: any);
    _buf: Buffer;
    _size: number;
    _len: number;
    _offset: number;
    get length(): number;
    get offset(): number;
    get remain(): number;
    get buffer(): Buffer;
    readByte(peek: boolean): number;
    peek(): number;
    readLength(offset: any): number;
    readSequence(tag: any): number;
    readInt(): number;
    readBoolean(): boolean;
    readEnumeration(): number;
    readString(tag: any, retbuf: any): string | Buffer;
    readOID(tag: any): string;
    _readTag(tag: any): number;
}
import { Buffer } from "safer-buffer";
