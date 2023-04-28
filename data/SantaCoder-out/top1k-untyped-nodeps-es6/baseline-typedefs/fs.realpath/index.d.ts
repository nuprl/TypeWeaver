export default realpath;
declare function realpath(p: string, cache: any, cb: Function): void;
declare namespace realpath {
    var realpath: typeof import("./index.js").default;
    var sync: (p: string, cache: any) => any;
    var realpathSync: (p: string, cache: any) => any;
    var monkeypatch: () => void;
    var unmonkeypatch: () => void;
}
