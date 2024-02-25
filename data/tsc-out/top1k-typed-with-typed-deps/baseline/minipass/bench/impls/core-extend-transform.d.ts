export = ExtendTransform;
declare class ExtendTransform extends stream.Transform {
    constructor(opts: any);
    _transform(data: any, enc: any, done: any): void;
}
import stream = require("stream");
