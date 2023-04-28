declare var posix: {
    resolve: () => string;
    normalize: (path: string) => string;
    isAbsolute: (path: string) => boolean;
    join: () => string;
    relative: (from: string, to: string) => string;
    _makeLong: (path: string) => string;
    dirname: (path: string) => string;
    basename: (path: string, ext: string) => string;
    extname: (path: string) => string;
    format: (pathObject: PathObject) => any;
    parse: (path: string) => {
        root: string;
        dir: string;
        base: string;
        ext: string;
        name: string;
    };
    sep: string;
    delimiter: string;
    win32: any;
    posix: any;
};
export default posix;
