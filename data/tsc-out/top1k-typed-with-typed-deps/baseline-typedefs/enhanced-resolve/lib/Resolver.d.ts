export = Resolver;
declare class Resolver {
    static createStackEntry(hook: ResolveStepHook, request: ResolveRequest): StackEntry;
    constructor(fileSystem: FileSystem, options: ResolveOptions);
    fileSystem: FileSystem;
    options: import("./ResolverFactory").ResolveOptions;
    hooks: {
        resolveStep: SyncHook<[ResolveStepHook, ResolveRequest], void>;
        noResolve: SyncHook<[ResolveRequest, Error]>;
        resolve: ResolveStepHook;
        result: AsyncSeriesHook<[ResolveRequest, ResolveContext]>;
    };
    ensureHook(name: string | ResolveStepHook): ResolveStepHook;
    getHook(name: string | ResolveStepHook): ResolveStepHook;
    resolveSync(context: object, path: string, request: string): string | false;
    resolve(context: object, path: string, request: string, resolveContext: ResolveContext, callback: (arg0: Error | null, arg1: (string | false) | undefined, arg2: ResolveRequest | undefined) => void): void;
    doResolve(hook: any, request: any, message: any, resolveContext: any, callback: any): any;
    parse(identifier: string): ParsedIdentifier;
    isModule(path: any): boolean;
    isPrivate(path: any): boolean;
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
type ResolveContext = {
    contextDependencies?: WriteOnlySet<string> | undefined;
    fileDependencies?: WriteOnlySet<string> | undefined;
    missingDependencies?: WriteOnlySet<string> | undefined;
    stack?: Set<StackEntry> | undefined;
    log?: ((arg0: string) => void) | undefined;
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
