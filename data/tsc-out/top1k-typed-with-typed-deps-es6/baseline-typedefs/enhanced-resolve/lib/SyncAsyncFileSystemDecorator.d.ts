export default SyncAsyncFileSystemDecorator;
export type FileSystem = import("./Resolver").FileSystem;
export type SyncFileSystem = import("./Resolver").SyncFileSystem;
declare function SyncAsyncFileSystemDecorator(fs: SyncFileSystem): void;
declare class SyncAsyncFileSystemDecorator {
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
