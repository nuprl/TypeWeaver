/// <reference types="node" />
export = PerMessageDeflate;
/**
 * permessage-deflate implementation.
 */
declare class PerMessageDeflate {
    /**
     * @type {String}
     */
    static get extensionName(): string;
    /**
     * Creates a PerMessageDeflate instance.
     *
     * @param {Object} [options] Configuration options
     * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
     *     for, or request, a custom client window size
     * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
     *     acknowledge disabling of client context takeover
     * @param {Number} [options.concurrencyLimit=10] The number of concurrent
     *     calls to zlib
     * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
     *     use of a custom server window size
     * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
     *     disabling of server context takeover
     * @param {Number} [options.threshold=1024] Size (in bytes) below which
     *     messages should not be compressed if context takeover is disabled
     * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
     *     deflate
     * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
     *     inflate
     * @param {Boolean} [isServer=false] Create the instance in either server or
     *     client mode
     * @param {Number} [maxPayload=0] The maximum allowed message length
     */
    constructor(options?: {
        clientMaxWindowBits?: (boolean | number);
        clientNoContextTakeover?: boolean;
        concurrencyLimit?: number;
        serverMaxWindowBits?: (boolean | number);
        serverNoContextTakeover?: boolean;
        threshold?: number;
        zlibDeflateOptions?: any;
        zlibInflateOptions?: any;
    }, isServer?: boolean, maxPayload?: number);
    _maxPayload: number;
    _options: {
        clientMaxWindowBits?: (boolean | number);
        clientNoContextTakeover?: boolean;
        concurrencyLimit?: number;
        serverMaxWindowBits?: (boolean | number);
        serverNoContextTakeover?: boolean;
        threshold?: number;
        zlibDeflateOptions?: any;
        zlibInflateOptions?: any;
    };
    _threshold: number;
    _isServer: boolean;
    _deflate: zlib.DeflateRaw;
    _inflate: zlib.InflateRaw;
    params: any;
    /**
     * Create an extension negotiation offer.
     *
     * @return {Object} Extension parameters
     * @public
     */
    public offer(): any;
    /**
     * Accept an extension negotiation offer/response.
     *
     * @param {Array} configurations The extension negotiation offers/reponse
     * @return {Object} Accepted configuration
     * @public
     */
    public accept(configurations: any[]): any;
    /**
     * Releases all resources used by the extension.
     *
     * @public
     */
    public cleanup(): void;
    /**
     *  Accept an extension negotiation offer.
     *
     * @param {Array} offers The extension negotiation offers
     * @return {Object} Accepted configuration
     * @private
     */
    private acceptAsServer;
    /**
     * Accept the extension negotiation response.
     *
     * @param {Array} response The extension negotiation response
     * @return {Object} Accepted configuration
     * @private
     */
    private acceptAsClient;
    /**
     * Normalize parameters.
     *
     * @param {Array} configurations The extension negotiation offers/reponse
     * @return {Array} The offers/response with normalized parameters
     * @private
     */
    private normalizeParams;
    /**
     * Decompress data. Concurrency limited.
     *
     * @param {Buffer} data Compressed data
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @public
     */
    public decompress(data: Buffer, fin: boolean, callback: Function): void;
    /**
     * Compress data. Concurrency limited.
     *
     * @param {(Buffer|String)} data Data to compress
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @public
     */
    public compress(data: (Buffer | string), fin: boolean, callback: Function): void;
    /**
     * Decompress data.
     *
     * @param {Buffer} data Compressed data
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @private
     */
    private _decompress;
    /**
     * Compress data.
     *
     * @param {(Buffer|String)} data Data to compress
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @private
     */
    private _compress;
}
import zlib = require("zlib");
