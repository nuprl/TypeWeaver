declare function rimraf(p: string, options: any, cb: any): void;
declare namespace rimraf {
    var sync: typeof rimrafSync;
}
declare function rimrafSync(p: string, options: any): void;
export default rimraf;
