/// <reference types="node" />
declare var posix: {
    resolve: () => string;
    normalize: (path: string | Buffer) => string;
    isAbsolute: (path: string | Buffer) => boolean;
    join: () => string;
    relative: (from: Path, to: Path) => any;
    _makeLong: (path: any) => any;
    dirname: (path: PathString) => any;
    basename: (path: PathLike, ext: string | null | undefined) => any;
    extname: (path: Path) => any;
    format: (pathObject: PathObject) => any;
    parse: (path: string | string[]) => {
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
