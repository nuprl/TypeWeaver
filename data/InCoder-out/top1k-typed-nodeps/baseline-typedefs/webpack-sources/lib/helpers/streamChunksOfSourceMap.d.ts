declare const getGeneratedSourceInfo: any;
declare const getSource: any;
declare const readMappings: any;
declare const splitIntoLines: any;
declare const streamChunksOfSourceMapFull: (source: any, sourceMap: any, onChunk: any, onSource: any, onName: any) => {
    generatedLine: any;
    generatedColumn: any;
};
declare const streamChunksOfSourceMapLinesFull: (source: any, sourceMap: any, onChunk: any, onSource: any, _onName: any) => {
    generatedLine: any;
    generatedColumn: any;
};
declare const streamChunksOfSourceMapFinal: (source: any, sourceMap: any, onChunk: any, onSource: any, onName: any) => any;
declare const streamChunksOfSourceMapLinesFinal: (source: any, sourceMap: any, onChunk: any, onSource: any, _onName: any) => any;
