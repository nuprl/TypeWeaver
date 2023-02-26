declare var Stream: any;
declare function legacy(fs: FileSystem): {
    ReadStream: (path: string, options: ReadableOptions) => any;
    WriteStream: (path: string, options: IWriteStreamOptions) => any;
};
