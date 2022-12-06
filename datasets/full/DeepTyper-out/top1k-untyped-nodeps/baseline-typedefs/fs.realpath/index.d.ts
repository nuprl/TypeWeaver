declare var fs: any;
declare var origRealpath: any;
declare var origRealpathSync: any;
declare var version: any;
declare var ok: boolean;
declare var old: any;
declare function newError(er: any): any;
declare function realpath(p: string, cache: any, cb: any): any;
declare namespace realpath {
    var realpath: typeof globalThis.realpath;
    var sync: typeof globalThis.realpathSync;
    var realpathSync: typeof globalThis.realpathSync;
    var monkeypatch: typeof globalThis.monkeypatch;
    var unmonkeypatch: typeof globalThis.unmonkeypatch;
}
declare function realpathSync(p: string, cache: string): any;
declare function monkeypatch(): void;
declare function unmonkeypatch(): void;
