/// <reference types="node" />
declare var Stream: any;
declare function legacy(fs: any): {
    ReadStream: (path: string | Buffer, options: any) => any;
    WriteStream: (path: string | Buffer, options: WriteStreamOptions) => any;
};
