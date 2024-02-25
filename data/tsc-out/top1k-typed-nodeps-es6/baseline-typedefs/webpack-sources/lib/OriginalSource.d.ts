export default OriginalSource;
declare class OriginalSource extends Source {
    constructor(value: any, name: any);
    _value: any;
    _valueAsBuffer: Buffer;
    _name: any;
    getName(): any;
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
    streamChunks(options: object, onChunk: (arg0: string, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number) => void, onSource: (arg0: number, arg1: string, arg2: string) => any, onName: (arg0: number, arg1: string) => any): void;
    updateHash(hash: any): void;
}
import Source from "./Source";
