export = CompatSource;
declare class CompatSource extends Source {
    static from(sourceLike: any): Source | CompatSource;
    constructor(sourceLike: any);
    _sourceLike: any;
    source(): any;
    buffer(): any;
    size(): any;
    sourceAndMap(options: any): any;
    updateHash(hash: any): any;
}
import Source = require("./Source");
