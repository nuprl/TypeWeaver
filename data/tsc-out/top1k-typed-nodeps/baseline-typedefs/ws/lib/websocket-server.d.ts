/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
export = WebSocketServer;
declare class WebSocketServer extends EventEmitter {
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
    public address(): (any | string | null);
    public close(cb?: Function): void;
    public shouldHandle(req: http.IncomingMessage): boolean;
    public handleUpgrade(req: http.IncomingMessage, socket: (net.Socket | tls.Socket), head: Buffer, cb: Function): void;
    private completeUpgrade;
}
import EventEmitter = require("events");
import http = require("http");
import https = require("https");
import net = require("net");
