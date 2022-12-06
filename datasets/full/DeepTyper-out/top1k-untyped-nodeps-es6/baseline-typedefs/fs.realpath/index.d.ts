export default realpath;
declare function realpath(p: string, cache: any, cb: any): any;
declare namespace realpath {
    var realpath: typeof import("./index.js").default;
    var sync: (p: string, cache: string) => any;
    var realpathSync: (p: string, cache: string) => any;
    var monkeypatch: () => void;
    var unmonkeypatch: () => void;
}
