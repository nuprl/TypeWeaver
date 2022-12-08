declare const getMap: any, getSourceAndMap: any;
declare const splitIntoLines: any;
declare const getGeneratedSourceInfo: any;
declare const Source: any;
declare const splitIntoPotentialTokens: any;
declare class OriginalSource extends Source {
    constructor(value: any, name: any);
    getName(): any;
    source(): any;
    buffer(): any;
    map(options: any): any;
    sourceAndMap(options: any): any;
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): any;
    updateHash(hash: any): void;
}
