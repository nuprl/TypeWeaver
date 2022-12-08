import Source from './Source';
declare class SourceMapSource extends Source {
    constructor(value: any, name: any, sourceMap: any, originalSource: any, innerSourceMap: any, removeOriginalSource: any);
    _ensureValueBuffer(): void;
    _ensureValueString(): void;
    _ensureOriginalSourceBuffer(): void;
    _ensureOriginalSourceString(): void;
    _ensureInnerSourceMapObject(): void;
    _ensureInnerSourceMapBuffer(): void;
    _ensureInnerSourceMapString(): void;
    _ensureSourceMapObject(): void;
    _ensureSourceMapBuffer(): void;
    _ensureSourceMapString(): void;
    getArgsAsBuffers(): any[];
    buffer(): any;
    source(): any;
    map(options: any): any;
    sourceAndMap(options: any): {
        source: any;
        map: any;
    };
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
export default SourceMapSource;
