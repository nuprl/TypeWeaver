export default mkdirp;
declare function mkdirp(path: any, opts: any): any;
declare namespace mkdirp {
    export { mkdirpSync as sync };
    export function native(path: any, opts: any): any;
    export function manual(path: any, opts: any): any;
    export function nativeSync(path: any, opts: any): any;
    export function manualSync(path: any, opts: any): any;
}
declare function mkdirpSync(path: any, opts: any): any;
