export = SyncAsyncFileSystemDecorator;
/** @typedef {import("./Resolver").FileSystem} FileSystem */
/** @typedef {import("./Resolver").SyncFileSystem} SyncFileSystem */
/**
 * @param {SyncFileSystem} fs file system implementation
 * @constructor
 */
declare function SyncAsyncFileSystemDecorator(fs: SyncFileSystem): void;
declare class SyncAsyncFileSystemDecorator {
    /** @typedef {import("./Resolver").FileSystem} FileSystem */
    /** @typedef {import("./Resolver").SyncFileSystem} SyncFileSystem */
    /**
     * @param {SyncFileSystem} fs file system implementation
     * @constructor
     */
    constructor(fs: SyncFileSystem);
    fs: import("./Resolver").SyncFileSystem;
    lstat: (arg: any, options: any, callback: any) => any;
    lstatSync: (arg: any, options: any) => any;
    stat: (arg: any, options: any, callback: any) => any;
    statSync: (arg: any, options: any) => import("./Resolver").FileSystemStats;
    readdir: (arg: any, options: any, callback: any) => any;
    readdirSync: (arg: any, options: any) => (string | Buffer)[] | import("./Resolver").FileSystemDirent[];
    readFile: (arg: any, options: any, callback: any) => any;
    readFileSync: (arg: any, options: any) => string | Buffer;
    readlink: (arg: any, options: any, callback: any) => any;
    readlinkSync: (arg: any, options: any) => string | Buffer;
    readJson: (arg: any, options: any, callback: any) => any;
    readJsonSync: (arg: any, options: any) => any;
}
declare namespace SyncAsyncFileSystemDecorator {
    export { FileSystem, SyncFileSystem };
}
type SyncFileSystem = import("./Resolver").SyncFileSystem;
type FileSystem = import("./Resolver").FileSystem;
