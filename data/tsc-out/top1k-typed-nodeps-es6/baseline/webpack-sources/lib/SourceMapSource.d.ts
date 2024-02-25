export default SourceMapSource;
declare class SourceMapSource extends Source {
    constructor(value: any, name: any, sourceMap: any, originalSource: any, innerSourceMap: any, removeOriginalSource: any);
    _valueAsString: any;
    _valueAsBuffer: Buffer;
    _name: any;
    _hasSourceMap: boolean;
    _sourceMapAsObject: any;
    _sourceMapAsString: string;
    _sourceMapAsBuffer: Buffer;
    _hasOriginalSource: boolean;
    _originalSourceAsString: any;
    _originalSourceAsBuffer: Buffer;
    _hasInnerSourceMap: boolean;
    _innerSourceMapAsObject: any;
    _innerSourceMapAsString: string;
    _innerSourceMapAsBuffer: Buffer;
    _removeOriginalSource: any;
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
    source(): any;
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
}
import Source from "./Source";
