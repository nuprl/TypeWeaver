declare const getMap: any, getSourceAndMap: any;
declare const streamChunks: any;
declare const Source: any;
declare const splitIntoLines: any;
declare const hasStableSort: boolean;
declare const MAX_SOURCE_POSITION = 536870912;
declare class Replacement {
    constructor(start: any, end: any, content: any, name: any);
}
declare class ReplaceSource extends Source {
    constructor(source: any, name: any);
    getName(): any;
    getReplacements(): any;
    replace(start: any, end: any, newValue: any, name: any): void;
    insert(pos: any, newValue: any, name: any): void;
    source(): any;
    map(options: any): any;
    sourceAndMap(options: any): any;
    original(): any;
    _sortReplacements(): void;
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): {
        generatedLine: any;
        generatedColumn: any;
    };
    updateHash(hash: any): void;
}
