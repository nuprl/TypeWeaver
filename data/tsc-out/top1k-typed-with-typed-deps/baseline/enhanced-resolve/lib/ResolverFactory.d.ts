export function createResolver(options: UserResolveOptions): Resolver;
export type AliasOptionEntry = import("./AliasPlugin").AliasOption;
export type ExtensionAliasOption = import("./ExtensionAliasPlugin").ExtensionAliasOption;
export type PnpApi = import("./PnpPlugin").PnpApiImpl;
export type FileSystem = import("./Resolver").FileSystem;
export type ResolveRequest = import("./Resolver").ResolveRequest;
export type SyncFileSystem = import("./Resolver").SyncFileSystem;
export type AliasOptionNewRequest = string | string[] | false;
export type AliasOptions = {
    [k: string]: AliasOptionNewRequest;
};
export type ExtensionAliasOptions = {
    [k: string]: string | string[];
};
export type Plugin = {
    apply: (arg0: Resolver) => void;
} | ((this: Resolver, arg1: Resolver) => void);
export type UserResolveOptions = {
    /**
     * A list of module alias configurations or an object which maps key to value
     */
    alias?: (AliasOptions | AliasOptionEntry[]) | undefined;
    /**
     * A list of module alias configurations or an object which maps key to value, applied only after modules option
     */
    fallback?: (AliasOptions | AliasOptionEntry[]) | undefined;
    /**
     * An object which maps extension to extension aliases
     */
    extensionAlias?: ExtensionAliasOptions | undefined;
    /**
     * A list of alias fields in description files
     */
    aliasFields?: (string | string[])[] | undefined;
    /**
     * A function which decides whether a request should be cached or not. An object is passed with at least `path` and `request` properties.
     */
    cachePredicate?: ((arg0: ResolveRequest) => boolean) | undefined;
    /**
     * Whether or not the unsafeCache should include request context as part of the cache key.
     */
    cacheWithContext?: boolean | undefined;
    /**
     * A list of description files to read from
     */
    descriptionFiles?: string[] | undefined;
    /**
     * A list of exports field condition names.
     */
    conditionNames?: string[] | undefined;
    /**
     * Enforce that a extension from extensions must be used
     */
    enforceExtension?: boolean | undefined;
    /**
     * A list of exports fields in description files
     */
    exportsFields?: (string | string[])[] | undefined;
    /**
     * A list of imports fields in description files
     */
    importsFields?: (string | string[])[] | undefined;
    /**
     * A list of extensions which should be tried for files
     */
    extensions?: string[] | undefined;
    /**
     * The file system which should be used
     */
    fileSystem: FileSystem;
    /**
     * Use this cache object to unsafely cache the successful requests
     */
    unsafeCache?: (object | boolean) | undefined;
    /**
     * Resolve symlinks to their symlinked location
     */
    symlinks?: boolean | undefined;
    /**
     * A prepared Resolver to which the plugins are attached
     */
    resolver?: Resolver | undefined;
    /**
     * A list of directories to resolve modules from, can be absolute path or folder name
     */
    modules?: (string[] | string) | undefined;
    /**
     * A list of main fields in description files
     */
    mainFields?: (string | string[] | {
        name: string | string[];
        forceRelative: boolean;
    })[] | undefined;
    /**
     * A list of main files in directories
     */
    mainFiles?: string[] | undefined;
    /**
     * A list of additional resolve plugins which should be applied
     */
    plugins?: Plugin[] | undefined;
    /**
     * A PnP API that should be used - null is "never", undefined is "auto"
     */
    pnpApi?: (PnpApi | null) | undefined;
    /**
     * A list of root paths
     */
    roots?: string[] | undefined;
    /**
     * The request is already fully specified and no extensions or directories are resolved for it
     */
    fullySpecified?: boolean | undefined;
    /**
     * Resolve to a context instead of a file
     */
    resolveToContext?: boolean | undefined;
    /**
     * A list of resolve restrictions
     */
    restrictions?: (string | RegExp)[] | undefined;
    /**
     * Use only the sync constraints of the file system calls
     */
    useSyncFileSystemCalls?: boolean | undefined;
    /**
     * Prefer to resolve module requests as relative requests before falling back to modules
     */
    preferRelative?: boolean | undefined;
    /**
     * Prefer to resolve server-relative urls as absolute paths before falling back to resolve in roots
     */
    preferAbsolute?: boolean | undefined;
};
export type ResolveOptions = {
    alias: AliasOptionEntry[];
    fallback: AliasOptionEntry[];
    aliasFields: Set<string | string[]>;
    extensionAlias: ExtensionAliasOption[];
    cachePredicate: ((arg0: ResolveRequest) => boolean);
    cacheWithContext: boolean;
    /**
     * A list of exports field condition names.
     */
    conditionNames: Set<string>;
    descriptionFiles: string[];
    enforceExtension: boolean;
    exportsFields: Set<string | string[]>;
    importsFields: Set<string | string[]>;
    extensions: Set<string>;
    fileSystem: FileSystem;
    unsafeCache: object | false;
    symlinks: boolean;
    resolver?: Resolver | undefined;
    modules: Array<string | string[]>;
    mainFields: {
        name: string[];
        forceRelative: boolean;
    }[];
    mainFiles: Set<string>;
    plugins: Plugin[];
    pnpApi: PnpApi | null;
    roots: Set<string>;
    fullySpecified: boolean;
    resolveToContext: boolean;
    restrictions: Set<string | RegExp>;
    preferRelative: boolean;
    preferAbsolute: boolean;
};
import Resolver = require("./Resolver");
