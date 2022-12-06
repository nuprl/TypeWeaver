declare function utimesMillis(path: string, atime: string, mtime: string, callback: Function): void;
declare function utimesMillisSync(path: string, atime: string, mtime: string): number;
declare const _default: {
    utimesMillis: typeof utimesMillis;
    utimesMillisSync: typeof utimesMillisSync;
};
export default _default;
