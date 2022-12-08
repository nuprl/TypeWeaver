/// <reference types="node" />
import EventEmitter from 'events';
declare class WebSocket extends EventEmitter {
    constructor(address: any, protocols: any, options: any);
    get binaryType(): any;
    set binaryType(type: any);
    get bufferedAmount(): any;
    get extensions(): string;
    get isPaused(): any;
    get onclose(): any;
    get onerror(): any;
    get onopen(): any;
    get onmessage(): any;
    get protocol(): any;
    get readyState(): any;
    get url(): any;
    setSocket(socket: any, head: any, options: any): void;
    emitClose(): void;
    close(code: any, data: any): void;
    pause(): void;
    ping(data: any, mask: any, cb: any): void;
    pong(data: any, mask: any, cb: any): void;
    resume(): void;
    send(data: any, options: any, cb: any): void;
    terminate(): void;
}
export default WebSocket;
