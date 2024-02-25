export function Accumulator(initsize: any): void;
export class Accumulator {
    constructor(initsize: any);
    buf: Buffer;
    readOffset: number;
    writeOffset: number;
    writeAvail(): number;
    readAvail(): number;
    reserve(size: any): void;
    append(buf: any): void;
    assertReadableSize(size: any): void;
    peekString(size: any): string;
    readString(size: any): string;
    peekInt(size: any): any;
    readInt(bytes: any): any;
    peekDouble(): number;
    readDouble(): number;
    readAdvance(size: any): void;
    writeByte(value: any): void;
    writeInt(value: any, size: any): void;
    writeDouble(value: any): void;
}
export function BunserBuf(): void;
export class BunserBuf {
    buf: Accumulator;
    state: number;
    append(buf: any, synchronous: any): any;
    processLater(): void;
    process(synchronous: any): any;
    pduLen: any;
    raise(reason: any): never;
    expectCode(expected: any): void;
    decodeAny(): any;
    decodeArray(): any;
    decodeObject(): {};
    decodeTemplate(): {}[];
    decodeString(): string;
    decodeInt(relaxSizeAsserts: any): any;
}
export function loadFromBuffer(input: any): any;
export function dumpToBuffer(val: any): Buffer;
