export default PrefixSource;
declare class PrefixSource extends Source {
    constructor(prefix: any, source: any);
    _source: any;
    _prefix: any;
    getPrefix(): any;
    original(): any;
    source(): any;
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
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): {
        generatedLine: any;
        generatedColumn: any;
        source: any;
    };
    updateHash(hash: any): void;
}
import Source from "./Source";
