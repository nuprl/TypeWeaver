export default realpath;
declare function realpath(p: string, cache: Object, cb: Function): void;
declare namespace realpath {
    var realpath: typeof import("./index.js").default;
    var sync: (p: string, cache: Object) => any;
    var realpathSync: (p: string, cache: Object) => any;
    var monkeypatch: () => void;
    var unmonkeypatch: () => void;
}
