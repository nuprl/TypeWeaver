/// <reference types="node" />
import Source from './Source';
declare class ConcatSource extends Source {
    constructor();
    getChildren(): any;
    add(item: any): void;
    addAllSkipOptimizing(items: any): void;
    buffer(): Buffer;
    source(): string;
    size(): number;
    map(options: any): {
        version: number;
        file: string;
        mappings: string;
        sources: any[];
        sourcesContent: any[];
        names: any[];
    };
    sourceAndMap(options: any): {
        source: any;
        map: {
            version: number;
            file: string;
            mappings: string;
            sources: any[];
            sourcesContent: any[];
            names: any[];
        };
    };
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): any;
    updateHash(hash: any): void;
    _optimize(): void;
}
export default ConcatSource;
