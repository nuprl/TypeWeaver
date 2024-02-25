export = realpath;
declare function realpath(p: any, cache: any, cb: any): void;
declare namespace realpath {
    export { realpath };
    export { realpathSync as sync };
    export { realpathSync };
    export { monkeypatch };
    export { unmonkeypatch };
}
declare function realpathSync(p: any, cache: any): any;
declare function monkeypatch(): void;
declare function unmonkeypatch(): void;
