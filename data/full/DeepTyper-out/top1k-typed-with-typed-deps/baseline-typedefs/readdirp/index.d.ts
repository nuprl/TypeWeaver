declare const fs: any;
declare const Readable: any;
declare const sysPath: any;
declare const promisify: any;
declare const readdir: any;
declare const stat: any;
declare const lstat: any;
declare const realpath: any;
declare const RECURSIVE_ERROR_CODE: string;
declare const NORMAL_FLOW_ERRORS: Set<string>;
declare const FILE_TYPE: RegExp;
declare const DIR_TYPE: RegExp;
declare const FILE_DIR_TYPE: RegExp;
declare const EVERYTHING_TYPE: RegExp;
declare const ALL_TYPES: any[];
declare const isNormalFlowError: any;
declare const maj: number, min: number;
declare const wantBigintFsStats: boolean;
declare const normalizeFilter: any;
declare class ReaddirpStream extends Readable {
    static get defaultOptions(): {
        root: string;
        fileFilter: (path: string) => boolean;
        directoryFilter: (path: string) => boolean;
        type: RegExp;
        lstat: boolean;
        depth: number;
        alwaysStat: boolean;
    };
    constructor(options?: {});
    _read(batch: any): Promise<void>;
    _exploreDir(path: any, depth: any): Promise<{
        files: any[];
        depth: any;
        path: any;
    }>;
    _formatEntry(dirent: any, path: any): Promise<any>;
    _onError(err: any): void;
    _getEntryType(entry: any): Promise<void | "file" | "directory">;
    _includeAsFile(entry: any): boolean;
}
declare const readdirp: any;
declare const readdirpPromise: Promise<any>;
