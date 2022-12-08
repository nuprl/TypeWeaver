import Source from './Source';
declare class OriginalSource extends Source {
    constructor(value: any, name: any);
    getName(): any;
    source(): any;
    buffer(): any;
    map(options: any): any;
    sourceAndMap(options: any): any;
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): any;
    updateHash(hash: any): void;
}
export default OriginalSource;
