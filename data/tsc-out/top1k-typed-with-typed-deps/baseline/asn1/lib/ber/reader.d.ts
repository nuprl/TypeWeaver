/// <reference types="node" />
export = Reader;
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
    /**
     * Reads a single byte and advances offset; you can pass in `true` to make this
     * a "peek" operation (i.e., get the byte, but don't advance the offset).
     *
     * @param {Boolean} peek true means don't move offset.
     * @return {Number} the next byte, null if not enough data.
     */
    readByte(peek: boolean): number;
    peek(): number;
    /**
     * Reads a (potentially) variable length off the BER buffer.  This call is
     * not really meant to be called directly, as callers have to manipulate
     * the internal buffer afterwards.
     *
     * As a result of this call, you can call `Reader.length`, until the
     * next thing called that does a readLength.
     *
     * @return {Number} the amount of offset to advance the buffer.
     * @throws {InvalidAsn1Error} on bad ASN.1
     */
    readLength(offset: any): number;
    /**
     * Parses the next sequence in this BER buffer.
     *
     * To get the length of the sequence, call `Reader.length`.
     *
     * @return {Number} the sequence's tag.
     */
    readSequence(tag: any): number;
    readInt(): number;
    readBoolean(): boolean;
    readEnumeration(): number;
    readString(tag: any, retbuf: any): string | Buffer;
    readOID(tag: any): string;
    _readTag(tag: any): number;
}
import Buffer_1 = require("node/buffer");
import Buffer = Buffer_1.Buffer;
