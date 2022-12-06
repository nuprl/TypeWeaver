declare const fs: string;
declare const Readable: any;
declare const sysPath: string;
declare const promisify: any;
declare const readdir: Function;
declare const stat: string;
declare const lstat: Function;
declare const realpath: Function;
declare const RECURSIVE_ERROR_CODE: string;
declare const NORMAL_FLOW_ERRORS: Error;
declare const FILE_TYPE: string;
declare const DIR_TYPE: string;
declare const FILE_DIR_TYPE: string;
declare const EVERYTHING_TYPE: string;
declare const ALL_TYPES: any[];
declare const isNormalFlowError: Function;
declare const maj: number, min: number;
declare const wantBigintFsStats: boolean;
declare const normalizeFilter: Function;
declare class ReaddirpStream extends Readable {
    static get defaultOptions(): {
        root: string;
        fileFilter: (path: string) => boolean;
        directoryFilter: (path: string) => boolean;
        type: string;
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
    _formatEntry(dirent: any, path: any): Promise<object>;
    _onError(err: any): void;
    _getEntryType(entry: any): Promise<void | "file" | "directory">;
    _includeAsFile(entry: any): boolean;
}
declare const readdirp: Function;
declare const readdirpPromise: Function;
