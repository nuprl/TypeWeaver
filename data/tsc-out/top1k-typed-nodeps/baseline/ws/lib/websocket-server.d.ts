/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
export = WebSocketServer;
/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */
declare class WebSocketServer extends EventEmitter {
    /**
     * Create a `WebSocketServer` instance.
     *
     * @param {Object} options Configuration options
     * @param {Number} [options.backlog=511] The maximum length of the queue of
     *     pending connections
     * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
     *     track clients
     * @param {Function} [options.handleProtocols] A hook to handle protocols
     * @param {String} [options.host] The hostname where to bind the server
     * @param {Number} [options.maxPayload=104857600] The maximum allowed message
     *     size
     * @param {Boolean} [options.noServer=false] Enable no server mode
     * @param {String} [options.path] Accept only connections matching this path
     * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
     *     permessage-deflate
     * @param {Number} [options.port] The port where to bind the server
     * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
     *     server to use
     * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
     *     not to skip UTF-8 validation for text and close messages
     * @param {Function} [options.verifyClient] A hook to reject connections
     * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
     *     class to use. It must be the `WebSocket` class or class that extends it
     * @param {Function} [callback] A listener for the `listening` event
     */
    constructor(options: {
        backlog?: number;
        clientTracking?: boolean;
        handleProtocols?: Function;
        host?: string;
        maxPayload?: number;
        noServer?: boolean;
        path?: string;
        perMessageDeflate?: (boolean | any);
        port?: number;
        server?: (http.Server | https.Server);
        skipUTF8Validation?: boolean;
        verifyClient?: Function;
        WebSocket?: Function;
    }, callback?: Function);
    _server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | https.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    _removeListeners: Function;
    clients: Set<any>;
    _shouldEmitClose: boolean;
    options: {
        backlog?: number;
        clientTracking?: boolean;
        handleProtocols?: Function;
        host?: string;
        maxPayload?: number;
        noServer?: boolean;
        path?: string;
        perMessageDeflate?: (boolean | any);
        port?: number;
        server?: (http.Server | https.Server);
        skipUTF8Validation?: boolean;
        verifyClient?: Function;
        WebSocket?: Function;
    };
    _state: number;
    /**
     * Returns the bound address, the address family name, and port of the server
     * as reported by the operating system if listening on an IP socket.
     * If the server is listening on a pipe or UNIX domain socket, the name is
     * returned as a string.
     *
     * @return {(Object|String|null)} The address of the server
     * @public
     */
    public address(): (any | string | null);
    /**
     * Stop the server from accepting new connections and emit the `'close'` event
     * when all existing connections are closed.
     *
     * @param {Function} [cb] A one-time listener for the `'close'` event
     * @public
     */
    public close(cb?: Function): void;
    /**
     * See if a given request should be handled by this server instance.
     *
     * @param {http.IncomingMessage} req Request object to inspect
     * @return {Boolean} `true` if the request is valid, else `false`
     * @public
     */
    public shouldHandle(req: http.IncomingMessage): boolean;
    /**
     * Handle a HTTP Upgrade request.
     *
     * @param {http.IncomingMessage} req The request object
     * @param {(net.Socket|tls.Socket)} socket The network socket between the
     *     server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Function} cb Callback
     * @public
     */
    public handleUpgrade(req: http.IncomingMessage, socket: (net.Socket | tls.Socket), head: Buffer, cb: Function): void;
    /**
     * Upgrade the connection to WebSocket.
     *
     * @param {Object} extensions The accepted extensions
     * @param {String} key The value of the `Sec-WebSocket-Key` header
     * @param {Set} protocols The subprotocols
     * @param {http.IncomingMessage} req The request object
     * @param {(net.Socket|tls.Socket)} socket The network socket between the
     *     server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Function} cb Callback
     * @throws {Error} If called more than once with the same socket
     * @private
     */
    private completeUpgrade;
}
import EventEmitter = require("events");
import http = require("http");
import https = require("https");
import net = require("net");
