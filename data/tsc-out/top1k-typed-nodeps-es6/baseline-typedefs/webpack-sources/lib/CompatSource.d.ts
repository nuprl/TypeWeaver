export default CompatSource;
declare class CompatSource extends Source {
    static from(sourceLike: any): Source | CompatSource;
    constructor(sourceLike: any);
    _sourceLike: any;
    source(): any;
    buffer(): any;
    size(): any;
    map(options: any): any;
    sourceAndMap(options: any): any;
    updateHash(hash: any): any;
}
import Source from "./Source";
