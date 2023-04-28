declare var fs: any;
declare var origRealpath: any;
declare var origRealpathSync: any;
declare var version: string;
declare var ok: boolean;
declare var old: any;
declare function newError(er: any): boolean;
declare function realpath(p: string, cache: Object, cb: Function): any;
declare namespace realpath {
    var realpath: typeof globalThis.realpath;
    var sync: typeof globalThis.realpathSync;
    var realpathSync: typeof globalThis.realpathSync;
    var monkeypatch: typeof globalThis.monkeypatch;
    var unmonkeypatch: typeof globalThis.unmonkeypatch;
}
declare function realpathSync(p: string, cache: Object): any;
declare function monkeypatch(): void;
declare function unmonkeypatch(): void;
