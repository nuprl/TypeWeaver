declare const Source: any;
declare class SizeOnlySource extends Source {
    constructor(size: any);
    _error(): Error;
    size(): any;
    source(): void;
    buffer(): void;
    map(options: any): void;
    updateHash(): void;
}
