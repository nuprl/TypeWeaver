export default isexe;
declare function isexe(path: string, options: any, cb: any): void;
declare namespace isexe {
    var sync: (path: string, options: any) => boolean;
}
