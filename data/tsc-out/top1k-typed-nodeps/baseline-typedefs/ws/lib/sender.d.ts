/// <reference types="node" />
export = Sender;
declare class Sender {
    public static frame(data: (Buffer | string), options: {
        fin?: boolean;
        generateMask?: Function;
        mask?: boolean;
        maskBuffer?: Buffer;
        opcode: number;
        readOnly?: boolean;
        rsv1?: boolean;
    }): (Buffer | string)[];
    constructor(socket: (net.Socket | tls.Socket), extensions?: any, generateMask?: Function);
    _extensions: any;
    _generateMask: Function;
    _maskBuffer: Buffer;
    _socket: any;
    _firstFragment: boolean;
    _compress: boolean;
    _bufferedBytes: number;
    _deflating: boolean;
    _queue: any[];
    public close(code?: number, data?: (string | Buffer), mask?: boolean, cb?: Function): void;
    public ping(data: any, mask?: boolean, cb?: Function): void;
    public pong(data: any, mask?: boolean, cb?: Function): void;
    public send(data: any, options: {
        binary?: boolean;
        compress?: boolean;
        fin?: boolean;
        mask?: boolean;
    }, cb?: Function): void;
    private dispatch;
    private dequeue;
    private enqueue;
    private sendFrame;
}
import net = require("net");
