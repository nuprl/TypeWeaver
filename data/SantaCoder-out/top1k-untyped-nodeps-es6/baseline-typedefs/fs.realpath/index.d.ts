export default realpath;
declare function realpath(p: string, cache: Cache, cb: any): void;
declare namespace realpath {
    var realpath: typeof import("./index.js").default;
    var sync: (p: string, cache: Cache) => any;
    var realpathSync: (p: string, cache: Cache) => any;
    var monkeypatch: () => void;
    var unmonkeypatch: () => void;
}
