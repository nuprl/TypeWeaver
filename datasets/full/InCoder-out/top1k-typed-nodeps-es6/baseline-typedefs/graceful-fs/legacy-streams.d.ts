/// <reference types="node" />
export default legacy;
declare function legacy(fs: any): {
    ReadStream: (path: string | Buffer, options: any) => any;
    WriteStream: (path: string | Buffer, options: WriteStreamOptions) => any;
};
