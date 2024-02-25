export = SizeOnlySource;
declare class SizeOnlySource extends Source {
    constructor(size: any);
    _size: any;
    _error(): Error;
    size(): any;
    buffer(): void;
    map(options: any): void;
    updateHash(): void;
}
import Source = require("./Source");
