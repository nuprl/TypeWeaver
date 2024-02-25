export = Source;
declare class Source {
    source(): void;
    buffer(): Buffer;
    size(): number;
    map(options: any): any;
    sourceAndMap(options: any): {
        source: void;
        map: any;
    };
    updateHash(hash: any): void;
}
