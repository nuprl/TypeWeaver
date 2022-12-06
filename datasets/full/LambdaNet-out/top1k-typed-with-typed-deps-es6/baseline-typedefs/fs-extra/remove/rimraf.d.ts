declare function rimraf(p: string, options: object, cb: Function): void;
declare namespace rimraf {
    var sync: typeof rimrafSync;
}
declare function rimrafSync(p: string, options: object): void;
export default rimraf;
