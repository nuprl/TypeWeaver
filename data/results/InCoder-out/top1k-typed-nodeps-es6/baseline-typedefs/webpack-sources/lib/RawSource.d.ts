import Source from './Source';
declare class RawSource extends Source {
    constructor(value: any, convertToString?: boolean);
    isBuffer(): any;
    source(): any;
    buffer(): any;
    map(options: any): any;
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): {
        generatedLine?: undefined;
        generatedColumn?: undefined;
        source?: undefined;
    } | {
        generatedLine: number;
        generatedColumn: any;
    };
    updateHash(hash: any): void;
}
export default RawSource;
