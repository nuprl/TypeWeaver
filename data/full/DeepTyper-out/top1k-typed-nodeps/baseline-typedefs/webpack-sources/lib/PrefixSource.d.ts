declare const Source: any;
declare const RawSource: any;
declare const streamChunks: any;
declare const getMap: any, getSourceAndMap: any;
declare const REPLACE_REGEX: RegExp;
declare class PrefixSource extends Source {
    constructor(prefix: any, source: any);
    getPrefix(): any;
    original(): any;
    source(): string;
    map(options: any): any;
    sourceAndMap(options: any): any;
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): {
        generatedLine: any;
        generatedColumn: any;
        source: string;
    };
    updateHash(hash: any): void;
}
