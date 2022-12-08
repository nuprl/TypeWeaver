/// <reference types="node" />
declare function rimraf(p: string | Buffer, options: any, cb: Function): void;
declare namespace rimraf {
    var sync: typeof rimrafSync;
}
declare function rimrafSync(p: string | Buffer, options: any): void;
export default rimraf;
