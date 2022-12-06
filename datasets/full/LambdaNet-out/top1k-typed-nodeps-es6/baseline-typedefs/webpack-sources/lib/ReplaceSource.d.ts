import Source from './Source';
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
        generatedLine: number;
        generatedColumn: any;
    };
    updateHash(hash: any): void;
}
export default ReplaceSource;
