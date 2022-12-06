/// <reference types="node" />
import { Readable } from 'stream';
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
export default readdirp;
