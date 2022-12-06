/// <reference types="node" />
import { Writable } from 'stream';
declare class Receiver extends Writable {
    constructor(options?: {});
    _write(chunk: any, encoding: any, cb: any): any;
    consume(n: any): any;
    startLoop(cb: any): void;
    getInfo(): Error;
    getPayloadLength16(): Error;
    getPayloadLength64(): Error;
    haveLength(): Error;
    getMask(): void;
    getData(cb: any): Error;
    decompress(data: any, cb: any): void;
    dataMessage(): Error;
    controlMessage(data: any): Error;
}
export default Receiver;
