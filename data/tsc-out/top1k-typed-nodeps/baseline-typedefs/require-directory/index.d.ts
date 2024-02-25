export = requireDirectory;
declare function requireDirectory(m: any, path: any, options: any): {};
declare namespace requireDirectory {
    export { defaultOptions as defaults };
}
declare namespace defaultOptions {
    const extensions: string[];
    const recurse: boolean;
    function rename(name: any): any;
    function visit(obj: any): any;
}
