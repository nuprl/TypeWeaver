declare var Stream: any;
declare function legacy(fs: any): {
    ReadStream: (path: string, options: ReadStreamOptions) => any;
    WriteStream: (path: string, options: WriteStreamOptions) => any;
};
