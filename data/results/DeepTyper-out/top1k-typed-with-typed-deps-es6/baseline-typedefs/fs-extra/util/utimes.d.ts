declare function utimesMillis(path: string, atime: any, mtime: number, callback: any): void;
declare function utimesMillisSync(path: string, atime: any, mtime: number): any;
declare const _default: {
    utimesMillis: typeof utimesMillis;
    utimesMillisSync: typeof utimesMillisSync;
};
export default _default;
