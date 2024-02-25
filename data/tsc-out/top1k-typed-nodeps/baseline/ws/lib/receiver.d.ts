export = Receiver;
/**
 * HyBi Receiver implementation.
 *
 * @extends Writable
 */
declare class Receiver extends Writable {
    /**
     * Creates a Receiver instance.
     *
     * @param {Object} [options] Options object
     * @param {String} [options.binaryType=nodebuffer] The type for binary data
     * @param {Object} [options.extensions] An object containing the negotiated
     *     extensions
     * @param {Boolean} [options.isServer=false] Specifies whether to operate in
     *     client or server mode
     * @param {Number} [options.maxPayload=0] The maximum allowed message length
     * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
     *     not to skip UTF-8 validation for text and close messages
     */
    constructor(options?: {
        binaryType?: string;
        extensions?: any;
        isServer?: boolean;
        maxPayload?: number;
        skipUTF8Validation?: boolean;
    });
    _binaryType: string;
    _extensions: any;
    _isServer: boolean;
    _maxPayload: number;
    _skipUTF8Validation: boolean;
    _bufferedBytes: number;
    _buffers: any[];
    _compressed: boolean;
    _payloadLength: number;
    _mask: Buffer;
    _fragmented: number;
    _masked: boolean;
    _fin: boolean;
    _opcode: number;
    _totalPayloadLength: number;
    _messageLength: number;
    _fragments: any[];
    _state: number;
    _loop: boolean;
    /**
     * Implements `Writable.prototype._write()`.
     *
     * @param {Buffer} chunk The chunk of data to write
     * @param {String} encoding The character encoding of `chunk`
     * @param {Function} cb Callback
     * @private
     */
    private _write;
    /**
     * Consumes `n` bytes from the buffered data.
     *
     * @param {Number} n The number of bytes to consume
     * @return {Buffer} The consumed bytes
     * @private
     */
    private consume;
    /**
     * Starts the parsing loop.
     *
     * @param {Function} cb Callback
     * @private
     */
    private startLoop;
    /**
     * Reads the first two bytes of a frame.
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */
    private getInfo;
    /**
     * Gets extended payload length (7+16).
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */
    private getPayloadLength16;
    /**
     * Gets extended payload length (7+64).
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */
    private getPayloadLength64;
    /**
     * Payload length has been read.
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */
    private haveLength;
    /**
     * Reads mask bytes.
     *
     * @private
     */
    private getMask;
    /**
     * Reads data bytes.
     *
     * @param {Function} cb Callback
     * @return {(Error|RangeError|undefined)} A possible error
     * @private
     */
    private getData;
    /**
     * Decompresses data.
     *
     * @param {Buffer} data Compressed data
     * @param {Function} cb Callback
     * @private
     */
    private decompress;
    /**
     * Handles a data message.
     *
     * @return {(Error|undefined)} A possible error
     * @private
     */
    private dataMessage;
    /**
     * Handles a control message.
     *
     * @param {Buffer} data Data to handle
     * @return {(Error|RangeError|undefined)} A possible error
     * @private
     */
    private controlMessage;
}
import { Writable } from "stream";
