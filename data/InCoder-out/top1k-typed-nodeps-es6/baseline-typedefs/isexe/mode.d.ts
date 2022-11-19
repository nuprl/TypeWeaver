/// <reference types="node" />
export default isexe;
declare function isexe(path: string | Buffer, options: any, cb: Function): void;
declare namespace isexe {
    var sync: (path: Path, options: Options) => number | boolean;
}
