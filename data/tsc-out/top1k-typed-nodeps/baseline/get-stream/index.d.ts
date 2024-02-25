export = getStream;
declare function getStream(inputStream: any, options: any): Promise<any>;
declare namespace getStream {
    export { buffer, array, MaxBufferError };
}
declare function buffer(stream: any, options: any): Promise<any>;
declare function array(stream: any, options: any): Promise<any>;
declare class MaxBufferError extends Error {
    constructor();
}
