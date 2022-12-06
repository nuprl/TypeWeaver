declare const streamChunksOfRawSource: any;
declare const Source: any;
declare class RawSource extends Source {
    constructor(value: any, convertToString?: boolean);
    isBuffer(): any;
    source(): any;
    buffer(): any;
    map(options: any): any;
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): any;
    updateHash(hash: any): void;
}
