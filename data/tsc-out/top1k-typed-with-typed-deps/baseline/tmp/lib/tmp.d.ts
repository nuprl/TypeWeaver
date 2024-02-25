export const tmpdir: string;
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
/**
 * Creates a temporary directory.
 *
 * @param {(Options|dirCallback)} options the options or the callback function
 * @param {?dirCallback} callback
 */
export function dir(options: (Options | dirCallback), callback: dirCallback | null): void;
/**
 * Synchronous version of dir.
 *
 * @param {Options} options
 * @returns {DirSyncObject} object consists of name and removeCallback
 * @throws {Error} if it cannot create a directory
 */
export function dirSync(options: Options): DirSyncObject;
/**
 * Creates and opens a temporary file.
 *
 * @param {(Options|null|undefined|fileCallback)} options the config options or the callback function or null or undefined
 * @param {?fileCallback} callback
 */
export function file(options: (Options | null | undefined | fileCallback), callback: fileCallback | null): void;
/**
 * Synchronous version of file.
 *
 * @param {Options} options
 * @returns {FileSyncObject} object consists of name, fd and removeCallback
 * @throws {Error} if cannot create a file
 */
export function fileSync(options: Options): FileSyncObject;
/**
 * Gets a temporary file name.
 *
 * @param {(Options|tmpNameCallback)} options options or callback
 * @param {?tmpNameCallback} callback the callback function
 */
export function tmpName(options: (Options | tmpNameCallback), callback: tmpNameCallback | null): any;
/**
 * Synchronous version of tmpName.
 *
 * @param {Object} options
 * @returns {string} the generated random name
 * @throws {Error} if the options are invalid or could not generate a filename
 */
export function tmpNameSync(options: any): string;
/**
 * Sets the graceful cleanup.
 *
 * If graceful cleanup is set, tmp will remove all controlled temporary objects on process exit, otherwise the
 * temporary objects will remain in place, waiting to be cleaned up on system restart or otherwise scheduled temporary
 * object removals.
 */
export function setGracefulCleanup(): void;
