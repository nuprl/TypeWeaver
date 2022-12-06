declare const Source: any;
declare class CompatSource extends Source {
    static from(sourceLike: any): any;
    constructor(sourceLike: any);
    source(): any;
    buffer(): any;
    size(): any;
    map(options: any): any;
    sourceAndMap(options: any): any;
    updateHash(hash: any): any;
}
