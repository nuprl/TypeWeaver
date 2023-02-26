/// <reference types="node" />
import EventEmitter from 'events';
declare class WebSocketServer extends EventEmitter {
    constructor(options: any, callback: any);
    address(): any;
    close(cb: any): void;
    shouldHandle(req: any): boolean;
    handleUpgrade(req: any, socket: any, head: any, cb: any): void;
    completeUpgrade(extensions: any, key: any, protocols: any, req: any, socket: any, head: any, cb: any): any;
}
export default WebSocketServer;
