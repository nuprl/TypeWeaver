import Source from './Source';
declare class OriginalSource extends Source {
    constructor(value: any, name: any);
    getName(): any;
    source(): any;
    buffer(): any;
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
        generatedLine?: undefined;
        generatedColumn?: undefined;
        source?: undefined;
    } | {
        generatedLine: number;
        generatedColumn: any;
        source: any;
    };
    updateHash(hash: any): void;
}
export default OriginalSource;
