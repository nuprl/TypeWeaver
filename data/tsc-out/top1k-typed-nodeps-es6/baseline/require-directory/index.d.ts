export default requireDirectory;
export namespace defaults {
    const extensions: string[];
    const recurse: boolean;
    function rename(name: any): any;
    function visit(obj: any): any;
}
declare function requireDirectory(m: any, path: any, options: any): {};
