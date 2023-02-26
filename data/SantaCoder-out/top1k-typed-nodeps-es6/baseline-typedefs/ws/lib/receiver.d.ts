/// <reference types="node" />
import { Writable } from 'stream';
declare class Receiver extends Writable {
    constructor(options?: {});
    _write(chunk: any, encoding: any, cb: any): any;
    consume(n: any): any;
    startLoop(cb: any): void;
    getInfo(): any;
    getPayloadLength16(): any;
    getPayloadLength64(): any;
    haveLength(): any;
    getMask(): void;
    getData(cb: any): any;
    decompress(data: any, cb: any): void;
    dataMessage(): any;
    controlMessage(data: any): any;
}
export default Receiver;
