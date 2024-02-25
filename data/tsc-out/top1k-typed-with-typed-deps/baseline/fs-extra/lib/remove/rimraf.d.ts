export = rimraf;
declare function rimraf(p: any, options: any, cb: any): void;
declare namespace rimraf {
    export { rimrafSync as sync };
}
declare function rimrafSync(p: any, options: any): void;
