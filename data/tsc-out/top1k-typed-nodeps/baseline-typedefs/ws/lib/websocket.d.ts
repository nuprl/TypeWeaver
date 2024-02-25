/// <reference types="node" />
export = WebSocket;
declare class WebSocket extends EventEmitter {
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
    get binaryType(): string;
    get bufferedAmount(): number;
    get extensions(): string;
    get isPaused(): boolean;
    get onclose(): Function;
    get onerror(): Function;
    get onopen(): Function;
    get onmessage(): Function;
    get protocol(): string;
    get readyState(): number;
    get url(): string;
    private setSocket;
    private emitClose;
    public close(code?: number, data?: (string | Buffer)): void;
    public pause(): void;
    public ping(data?: any, mask?: boolean, cb?: Function): void;
    public pong(data?: any, mask?: boolean, cb?: Function): void;
    public resume(): void;
    public send(data: any, options?: {
        binary?: boolean;
        compress?: boolean;
        fin?: boolean;
        mask?: boolean;
    }, cb?: Function): void;
    public terminate(): void;
    readonly CONNECTING: number;
    readonly OPEN: number;
    readonly CLOSING: number;
    readonly CLOSED: number;
    addEventListener: typeof import("./event-target").EventTarget.addEventListener;
    removeEventListener: typeof import("./event-target").EventTarget.removeEventListener;
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
