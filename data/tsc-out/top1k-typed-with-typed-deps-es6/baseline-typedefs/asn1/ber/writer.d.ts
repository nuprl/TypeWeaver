export default Writer;
declare function Writer(options: any): void;
declare class Writer {
    constructor(options: any);
    _buf: Buffer;
    _size: number;
    _offset: number;
    _options: any;
    _seq: any[];
    get buffer(): Buffer;
    writeByte(b: any): void;
    writeInt(i: any, tag: any): void;
    writeNull(): void;
    writeEnumeration(i: any, tag: any): void;
    writeBoolean(b: any, tag: any): void;
    writeString(s: any, tag: any): void;
    writeBuffer(buf: any, tag: any): void;
    writeStringArray(strings: any): void;
    writeOID(s: any, tag: any): void;
    writeLength(len: any): void;
    startSequence(tag: any): void;
    endSequence(): void;
    _shift(start: any, len: any, shift: any): void;
    _ensure(len: any): void;
}
import { Buffer } from "safer-buffer";
