export = streamAndGetSourceAndMap;
declare function streamAndGetSourceAndMap(inputSource: any, options: any, onChunk: any, onSource: any, onName: any): {
    result: {
        generatedLine: any;
        generatedColumn: any;
        source: any;
    };
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
