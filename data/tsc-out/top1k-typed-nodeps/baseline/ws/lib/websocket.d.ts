/// <reference types="node" />
export = WebSocket;
/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
declare class WebSocket extends EventEmitter {
    /**
     * Create a new `WebSocket`.
     *
     * @param {(String|URL)} address The URL to which to connect
     * @param {(String|String[])} [protocols] The subprotocols
     * @param {Object} [options] Connection options
     */
    constructor(address: (string | URL), protocols?: (string | string[]), options?: any);
    _binaryType: string;
    _closeCode: number;
    _closeFrameReceived: boolean;
    _closeFrameSent: boolean;
    _closeMessage: Buffer;
    _closeTimer: NodeJS.Timeout;
    _extensions: {};
    _paused: boolean;
    _protocol: string;
    _readyState: number;
    _receiver: Receiver;
    _sender: Sender;
    _socket: any;
    _bufferedAmount: number;
    _isServer: boolean;
    _redirects: number;
    set binaryType(arg: string);
    /**
     * This deviates from the WHATWG interface since ws doesn't support the
     * required default "blob" type (instead we define a custom "nodebuffer"
     * type).
     *
     * @type {String}
     */
    get binaryType(): string;
    /**
     * @type {Number}
     */
    get bufferedAmount(): number;
    /**
     * @type {String}
     */
    get extensions(): string;
    /**
     * @type {Boolean}
     */
    get isPaused(): boolean;
    /**
     * @type {Function}
     */
    get onclose(): Function;
    /**
     * @type {Function}
     */
    get onerror(): Function;
    /**
     * @type {Function}
     */
    get onopen(): Function;
    /**
     * @type {Function}
     */
    get onmessage(): Function;
    /**
     * @type {String}
     */
    get protocol(): string;
    /**
     * @type {Number}
     */
    get readyState(): number;
    /**
     * @type {String}
     */
    get url(): string;
    /**
     * Set up the socket and the internal resources.
     *
     * @param {(net.Socket|tls.Socket)} socket The network socket between the
     *     server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Object} options Options object
     * @param {Function} [options.generateMask] The function used to generate the
     *     masking key
     * @param {Number} [options.maxPayload=0] The maximum allowed message size
     * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
     *     not to skip UTF-8 validation for text and close messages
     * @private
     */
    private setSocket;
    /**
     * Emit the `'close'` event.
     *
     * @private
     */
    private emitClose;
    /**
     * Start a closing handshake.
     *
     *          +----------+   +-----------+   +----------+
     *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
     *    |     +----------+   +-----------+   +----------+     |
     *          +----------+   +-----------+         |
     * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
     *          +----------+   +-----------+   |
     *    |           |                        |   +---+        |
     *                +------------------------+-->|fin| - - - -
     *    |         +---+                      |   +---+
     *     - - - - -|fin|<---------------------+
     *              +---+
     *
     * @param {Number} [code] Status code explaining why the connection is closing
     * @param {(String|Buffer)} [data] The reason why the connection is
     *     closing
     * @public
     */
    public close(code?: number, data?: (string | Buffer)): void;
    /**
     * Pause the socket.
     *
     * @public
     */
    public pause(): void;
    /**
     * Send a ping.
     *
     * @param {*} [data] The data to send
     * @param {Boolean} [mask] Indicates whether or not to mask `data`
     * @param {Function} [cb] Callback which is executed when the ping is sent
     * @public
     */
    public ping(data?: any, mask?: boolean, cb?: Function): void;
    /**
     * Send a pong.
     *
     * @param {*} [data] The data to send
     * @param {Boolean} [mask] Indicates whether or not to mask `data`
     * @param {Function} [cb] Callback which is executed when the pong is sent
     * @public
     */
    public pong(data?: any, mask?: boolean, cb?: Function): void;
    /**
     * Resume the socket.
     *
     * @public
     */
    public resume(): void;
    /**
     * Send a data message.
     *
     * @param {*} data The message to send
     * @param {Object} [options] Options object
     * @param {Boolean} [options.binary] Specifies whether `data` is binary or
     *     text
     * @param {Boolean} [options.compress] Specifies whether or not to compress
     *     `data`
     * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
     *     last one
     * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
     * @param {Function} [cb] Callback which is executed when data is written out
     * @public
     */
    public send(data: any, options?: {
        binary?: boolean;
        compress?: boolean;
        fin?: boolean;
        mask?: boolean;
    }, cb?: Function): void;
    /**
     * Forcibly close the connection.
     *
     * @public
     */
    public terminate(): void;
    readonly CONNECTING: number;
    readonly OPEN: number;
    readonly CLOSING: number;
    readonly CLOSED: number;
    addEventListener: (type: string, listener: Function, options?: {
        once?: boolean;
    }) => void;
    removeEventListener: (type: string, handler: Function) => void;
}
declare namespace WebSocket {
    const CONNECTING: number;
    const OPEN: number;
    const CLOSING: number;
    const CLOSED: number;
}
import EventEmitter = require("events");
import Receiver = require("./receiver");
import Sender = require("./sender");
import { URL } from "url";
