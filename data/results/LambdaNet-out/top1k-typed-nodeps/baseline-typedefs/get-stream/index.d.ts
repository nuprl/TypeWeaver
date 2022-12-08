declare const BufferConstants: any;
declare const stream: string;
declare const promisify: any;
declare const bufferStream: Function;
declare const streamPipelinePromisified: Function;
declare class MaxBufferError extends Error {
    constructor();
}
declare function getStream(inputStream: boolean, options: object): HTMLElement;
