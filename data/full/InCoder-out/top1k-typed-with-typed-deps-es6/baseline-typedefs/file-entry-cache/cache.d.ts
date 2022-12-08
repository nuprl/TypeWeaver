/// <reference types="node" />
declare const _default: {
    createFromFile: (filePath: string | Buffer, useChecksum: boolean | undefined) => any;
    create: (cacheId: number, _path: number, useChecksum: number) => {
        cache: any;
        getHash: (buffer: Buffer) => string;
        hasFileChanged: (file: File) => any;
        analyzeFiles: (files: string[]) => {
            changedFiles: any[];
            notFoundFiles: any[];
            notChangedFiles: any[];
        };
        getFileDescriptor: (file: File) => any;
        _getFileDescriptorUsingMtimeAndSize: (file: File, fstat: Stats) => {
            key: File;
            changed: any;
            meta: any;
        };
        _getFileDescriptorUsingChecksum: (file: File) => {
            key: File;
            changed: boolean;
            meta: any;
        };
        getUpdatedFiles: (files: string[]) => any;
        normalizeEntries: (files: string[]) => unknown[];
        removeEntry: (entryName: any) => void;
        deleteCacheFile: () => void;
        destroy: () => void;
        _getMetaForFileUsingCheckSum: (cacheEntry: CacheEntry) => any;
        _getMetaForFileUsingMtimeAndSize: (cacheEntry: CacheEntry) => any;
        reconcile: (noPrune: boolean) => void;
    };
};
export default _default;
