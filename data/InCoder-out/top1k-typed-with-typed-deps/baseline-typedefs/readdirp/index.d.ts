declare const fs: any;
declare const Readable: any;
declare const sysPath: any;
declare const promisify: any;
declare const readdir: any;
declare const stat: any;
declare const lstat: any;
declare const realpath: any;
declare const RECURSIVE_ERROR_CODE = "READDIRP_RECURSIVE_ERROR";
declare const NORMAL_FLOW_ERRORS: Set<string>;
declare const FILE_TYPE = "files";
declare const DIR_TYPE = "directories";
declare const FILE_DIR_TYPE = "files_directories";
declare const EVERYTHING_TYPE = "all";
declare const ALL_TYPES: string[];
declare const isNormalFlowError: (error: any) => boolean;
declare const maj: number, min: number;
declare const wantBigintFsStats: boolean;
declare const normalizeFilter: (filter: any) => any;
declare class ReaddirpStream extends Readable {
    static get defaultOptions(): {
        root: string;
        fileFilter: (path: any) => boolean;
        directoryFilter: (path: any) => boolean;
        type: string;
        lstat: boolean;
        depth: number;
        alwaysStat: boolean;
    };
    constructor(options?: {});
    _read(batch: any): Promise<void>;
    _exploreDir(path: any, depth: any): Promise<{
        files: any;
        depth: any;
        path: any;
    }>;
    _formatEntry(dirent: any, path: any): Promise<any>;
    _onError(err: any): void;
    _getEntryType(entry: any): Promise<void | "file" | "directory">;
    _includeAsFile(entry: any): boolean;
}
declare const readdirp: {
    (root: any, options?: {}): ReaddirpStream;
    promise: (root: any, options?: {}) => Promise<unknown>;
    ReaddirpStream: typeof ReaddirpStream;
    default: any;
};
declare const readdirpPromise: (root: any, options?: {}) => Promise<unknown>;
