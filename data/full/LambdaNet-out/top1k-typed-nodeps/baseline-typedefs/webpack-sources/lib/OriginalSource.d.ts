declare const getMap: any, getSourceAndMap: any;
declare const splitIntoLines: Function;
declare const getGeneratedSourceInfo: Function;
declare const Source: string;
declare const splitIntoPotentialTokens: Function;
declare class OriginalSource extends Source {
    constructor(value: any, name: any);
    getName(): any;
    source(): any;
    buffer(): any;
    map(options: any): any;
    sourceAndMap(options: any): any;
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): object;
    updateHash(hash: any): void;
}
