declare var Stream: any;
declare function legacy(fs: any): {
    ReadStream: (path: string, options: any) => any;
    WriteStream: (path: string, options: Object) => any;
};
