declare const BufferConstants: any;
declare const stream: any;
declare const promisify: any;
declare const bufferStream: any;
declare const streamPipelinePromisified: any;
declare class MaxBufferError extends Error {
    constructor();
}
declare function getStream(inputStream: ReadableStream, options: any): Promise<any>;
