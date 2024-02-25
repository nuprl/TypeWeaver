export function getSourceAndMap(inputSource: any, options: any): {
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
export function getMap(source: any, options: any): {
    version: number;
    file: string;
    mappings: string;
    sources: any[];
    sourcesContent: any[];
    names: any[];
};
