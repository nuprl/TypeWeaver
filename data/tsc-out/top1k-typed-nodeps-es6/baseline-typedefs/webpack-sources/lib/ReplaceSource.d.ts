export default ReplaceSource;
declare class ReplaceSource extends Source {
    constructor(source: any, name: any);
    _source: any;
    _name: any;
    _replacements: Replacement[];
    _isSorted: boolean;
    getName(): any;
    getReplacements(): Replacement[];
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
import Source from "./Source";
declare class Replacement {
    constructor(start: any, end: any, content: any, name: any);
    start: any;
    end: any;
    content: any;
    name: any;
    index: number;
}
