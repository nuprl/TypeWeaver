export = posix.parse;
declare function parse(pathString: any): {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
};
declare namespace parse {
    export { parse as posix, parse as win32 };
}
declare namespace posix { }
declare function parse(pathString: any): {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
};
