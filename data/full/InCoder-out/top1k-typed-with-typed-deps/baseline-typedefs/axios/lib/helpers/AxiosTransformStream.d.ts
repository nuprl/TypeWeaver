/// <reference types="node" />
import stream from 'stream';
declare class AxiosTransformStream extends stream.Transform {
    constructor(options: any);
    _read(size: any): void;
    _transform(chunk: any, encoding: any, callback: any): void;
    setLength(length: any): this;
}
export default AxiosTransformStream;
