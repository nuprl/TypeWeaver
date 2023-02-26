declare function utimesMillis(path: string, atime: number, mtime: number, callback: any): void;
declare function utimesMillisSync(path: string, atime: number, mtime: number): void;
declare const _default: {
    utimesMillis: typeof utimesMillis;
    utimesMillisSync: typeof utimesMillisSync;
};
export default _default;
