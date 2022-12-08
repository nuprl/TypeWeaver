/// <reference types="node" />
declare const Source: string;
declare const RawSource: string;
declare const streamChunks: object;
declare const getMap: any, getSourceAndMap: any;
declare const stringsAsRawSources: HTMLElement;
declare class ConcatSource extends Source {
    constructor();
    getChildren(): any;
    add(item: any): void;
    addAllSkipOptimizing(items: any): void;
    buffer(): Buffer;
    source(): string;
    size(): number;
    map(options: any): any;
    sourceAndMap(options: any): any;
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): any;
    updateHash(hash: any): void;
    _optimize(): void;
}
