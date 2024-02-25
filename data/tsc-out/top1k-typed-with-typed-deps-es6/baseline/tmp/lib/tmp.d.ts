/**
 * Configuration options.
 */
export type Options = {
    /**
     * the temporary object (file or dir) will not be garbage collected
     */
    keep: boolean | null;
    /**
     * the number of tries before give up the name generation
     */
    tries: number | null;
    /**
     * (?int) mode the access mode, defaults are 0o700 for directories and 0o600 for files
     */
    "": any;
    /**
     * the "mkstemp" like filename template
     */
    template: string | null;
    /**
     * fixed name relative to tmpdir or the specified dir option
     */
    name: string | null;
    /**
     * tmp directory relative to the root tmp directory in use
     */
    dir: string | null;
    /**
     * prefix for the generated name
     */
    prefix: string | null;
    /**
     * postfix for the generated name
     */
    postfix: string | null;
    /**
     * the root tmp directory which overrides the os tmpdir
     */
    tmpdir: string | null;
    /**
     * recursively removes the created temporary directory, even when it's not empty
     */
    unsafeCleanup: boolean | null;
    /**
     * detaches the file descriptor, caller is responsible for closing the file, tmp will no longer try closing the file during garbage collection
     */
    detachDescriptor: boolean | null;
    /**
     * discards the file descriptor (closes file, fd is -1), tmp will no longer try closing the file during garbage collection
     */
    discardDescriptor: boolean | null;
};
export type FileSyncObject = {
    /**
     * the name of the file
     */
    name: string;
    /**
     * the file descriptor or -1 if the fd has been discarded
     */
    fd: string;
    /**
     * the callback function to remove the file
     */
    removeCallback: fileCallback;
};
export type DirSyncObject = {
    /**
     * the name of the directory
     */
    name: string;
    /**
     * the callback function to remove the directory
     */
    removeCallback: fileCallback;
};
export type tmpNameCallback = (err: Error | null, name: string) => any;
export type fileCallback = (err: Error | null, name: string, fd: number, fn: cleanupCallback) => any;
export type fileCallbackSync = (err: Error | null, name: string, fd: number, fn: cleanupCallbackSync) => any;
export type dirCallback = (err: Error | null, name: string, fn: cleanupCallback) => any;
export type dirCallbackSync = (err: Error | null, name: string, fn: cleanupCallbackSync) => any;
/**
 * Removes the temporary created file or directory.
 */
export type cleanupCallback = (next?: simpleCallback) => any;
/**
 * Removes the temporary created file or directory.
 */
export type cleanupCallbackSync = () => any;
/**
 * Callback function for function composition.
 */
export type simpleCallback = () => any;
