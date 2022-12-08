declare class Sender {
    constructor(socket: any, extensions: any, generateMask: any);
    static frame(data: any, options: any): any[];
    close(code: any, data: any, mask: any, cb: any): void;
    ping(data: any, mask: any, cb: any): void;
    pong(data: any, mask: any, cb: any): void;
    send(data: any, options: any, cb: any): void;
    dispatch(data: any, compress: any, options: any, cb: any): void;
    dequeue(): void;
    enqueue(params: any): void;
    sendFrame(list: any, cb: any): void;
}
export default Sender;
