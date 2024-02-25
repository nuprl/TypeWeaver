export default ConcatSource;
declare class ConcatSource extends Source {
    constructor(...args: any[]);
    _children: any[];
    _isOptimized: boolean;
    getChildren(): any[];
    add(item: any): void;
    addAllSkipOptimizing(items: any): void;
    source(): string;
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
import Source from "./Source";
