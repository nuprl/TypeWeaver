export type Options = {
    keep: boolean | null;
    tries: number | null;
    "": any;
    template: string | null;
    name: string | null;
    dir: string | null;
    prefix: string | null;
    postfix: string | null;
    tmpdir: string | null;
    unsafeCleanup: boolean | null;
    detachDescriptor: boolean | null;
    discardDescriptor: boolean | null;
};
export type FileSyncObject = {
    name: string;
    fd: string;
    removeCallback: fileCallback;
};
export type DirSyncObject = {
    name: string;
    removeCallback: fileCallback;
};
export type tmpNameCallback = (err: Error | null, name: string) => any;
export type fileCallback = (err: Error | null, name: string, fd: number, fn: cleanupCallback) => any;
export type fileCallbackSync = (err: Error | null, name: string, fd: number, fn: cleanupCallbackSync) => any;
export type dirCallback = (err: Error | null, name: string, fn: cleanupCallback) => any;
export type dirCallbackSync = (err: Error | null, name: string, fn: cleanupCallbackSync) => any;
export type cleanupCallback = (next?: simpleCallback) => any;
export type cleanupCallbackSync = () => any;
export type simpleCallback = () => any;
