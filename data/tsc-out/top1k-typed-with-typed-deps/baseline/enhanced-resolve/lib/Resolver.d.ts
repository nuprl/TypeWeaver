export = Resolver;
declare class Resolver {
    /**
     * @param {ResolveStepHook} hook hook
     * @param {ResolveRequest} request request
     * @returns {StackEntry} stack entry
     */
    static createStackEntry(hook: ResolveStepHook, request: ResolveRequest): StackEntry;
    /**
     * @param {FileSystem} fileSystem a filesystem
     * @param {ResolveOptions} options options
     */
    constructor(fileSystem: FileSystem, options: ResolveOptions);
    fileSystem: FileSystem;
    options: import("./ResolverFactory").ResolveOptions;
    hooks: {
        /** @type {SyncHook<[ResolveStepHook, ResolveRequest], void>} */
        resolveStep: SyncHook<[ResolveStepHook, ResolveRequest], void>;
        /** @type {SyncHook<[ResolveRequest, Error]>} */
        noResolve: SyncHook<[ResolveRequest, Error]>;
        /** @type {ResolveStepHook} */
        resolve: ResolveStepHook;
        /** @type {AsyncSeriesHook<[ResolveRequest, ResolveContext]>} */
        result: AsyncSeriesHook<[ResolveRequest, ResolveContext]>;
    };
    /**
     * @param {string | ResolveStepHook} name hook name or hook itself
     * @returns {ResolveStepHook} the hook
     */
    ensureHook(name: string | ResolveStepHook): ResolveStepHook;
    /**
     * @param {string | ResolveStepHook} name hook name or hook itself
     * @returns {ResolveStepHook} the hook
     */
    getHook(name: string | ResolveStepHook): ResolveStepHook;
    /**
     * @param {object} context context information object
     * @param {string} path context path
     * @param {string} request request string
     * @returns {string | false} result
     */
    resolveSync(context: object, path: string, request: string): string | false;
    /**
     * @param {object} context context information object
     * @param {string} path context path
     * @param {string} request request string
     * @param {ResolveContext} resolveContext resolve context
     * @param {function(Error | null, (string|false)=, ResolveRequest=): void} callback callback function
     * @returns {void}
     */
    resolve(context: object, path: string, request: string, resolveContext: ResolveContext, callback: (arg0: Error | null, arg1: (string | false) | undefined, arg2: ResolveRequest | undefined) => void): void;
    doResolve(hook: any, request: any, message: any, resolveContext: any, callback: any): any;
    /**
     * @param {string} identifier identifier
     * @returns {ParsedIdentifier} parsed identifier
     */
    parse(identifier: string): ParsedIdentifier;
    isModule(path: any): boolean;
    isPrivate(path: any): boolean;
    /**
     * @param {string} path a path
     * @returns {boolean} true, if the path is a directory path
     */
    isDirectory(path: string): boolean;
    join(path: any, request: any): string;
    normalize(path: any): string;
}
declare namespace Resolver {
    export { ResolveOptions, FileSystemStats, FileSystemDirent, PossibleFileSystemError, FileSystemCallback, FileSystem, SyncFileSystem, ParsedIdentifier, BaseResolveRequest, ResolveRequest, StackEntry, WriteOnlySet, ResolveContext, ResolveStepHook };
}
type FileSystem = {
    readFile: ((arg0: string, arg1: FileSystemCallback<Buffer | string>) => void) & ((arg0: string, arg1: object, arg2: FileSystemCallback<Buffer | string>) => void);
    readdir: ((arg0: string, arg1: FileSystemCallback<(Buffer | string)[] | FileSystemDirent[]>) => void) & ((arg0: string, arg1: object, arg2: FileSystemCallback<(Buffer | string)[] | FileSystemDirent[]>) => void);
    readJson?: (((arg0: string, arg1: FileSystemCallback<object>) => void) & ((arg0: string, arg1: object, arg2: FileSystemCallback<object>) => void)) | undefined;
    readlink: ((arg0: string, arg1: FileSystemCallback<Buffer | string>) => void) & ((arg0: string, arg1: object, arg2: FileSystemCallback<Buffer | string>) => void);
    lstat?: (((arg0: string, arg1: FileSystemCallback<FileSystemStats>) => void) & ((arg0: string, arg1: object, arg2: FileSystemCallback<Buffer | string>) => void)) | undefined;
    stat: ((arg0: string, arg1: FileSystemCallback<FileSystemStats>) => void) & ((arg0: string, arg1: object, arg2: FileSystemCallback<Buffer | string>) => void);
};
import { SyncHook } from "tapable";
type ResolveStepHook = AsyncSeriesBailHook<[ResolveRequest, ResolveContext], ResolveRequest | null>;
type ResolveRequest = BaseResolveRequest & Partial<ParsedIdentifier>;
import { AsyncSeriesHook } from "tapable";
/**
 * Resolve context
 */
type ResolveContext = {
    contextDependencies?: WriteOnlySet<string> | undefined;
    /**
     * files that was found on file system
     */
    fileDependencies?: WriteOnlySet<string> | undefined;
    /**
     * dependencies that was not found on file system
     */
    missingDependencies?: WriteOnlySet<string> | undefined;
    /**
     * set of hooks' calls. For instance, `resolve → parsedResolve → describedResolve`,
     */
    stack?: Set<StackEntry> | undefined;
    /**
     * log function
     */
    log?: ((arg0: string) => void) | undefined;
    /**
     * yield result, if provided plugins can return several results
     */
    yield?: ((arg0: ResolveRequest) => void) | undefined;
};
type ParsedIdentifier = {
    request: string;
    query: string;
    fragment: string;
    directory: boolean;
    module: boolean;
    file: boolean;
    internal: boolean;
};
/**
 * String with special formatting
 */
type StackEntry = string;
type ResolveOptions = import("./ResolverFactory").ResolveOptions;
type FileSystemStats = {
    isDirectory: () => boolean;
    isFile: () => boolean;
};
type FileSystemDirent = {
    name: Buffer | string;
    isDirectory: () => boolean;
    isFile: () => boolean;
};
type PossibleFileSystemError = {
    code?: string | undefined;
    errno?: number | undefined;
    path?: string | undefined;
    syscall?: string | undefined;
};
type FileSystemCallback<T> = (err: (PossibleFileSystemError & Error) | null | undefined, result?: T | undefined) => any;
type SyncFileSystem = {
    readFileSync: (arg0: string, arg1: object | undefined) => Buffer | string;
    readdirSync: (arg0: string, arg1: object | undefined) => (Buffer | string)[] | FileSystemDirent[];
    readJsonSync?: ((arg0: string, arg1: object | undefined) => object) | undefined;
    readlinkSync: (arg0: string, arg1: object | undefined) => Buffer | string;
    lstatSync?: ((arg0: string, arg1: object | undefined) => FileSystemStats) | undefined;
    statSync: (arg0: string, arg1: object | undefined) => FileSystemStats;
};
type BaseResolveRequest = {
    path: string | false;
    descriptionFilePath?: string | undefined;
    descriptionFileRoot?: string | undefined;
    descriptionFileData?: object | undefined;
    relativePath?: string | undefined;
    ignoreSymlinks?: boolean | undefined;
    fullySpecified?: boolean | undefined;
};
type WriteOnlySet<T> = {
    add: (T: any) => void;
};
import { AsyncSeriesBailHook } from "tapable";
