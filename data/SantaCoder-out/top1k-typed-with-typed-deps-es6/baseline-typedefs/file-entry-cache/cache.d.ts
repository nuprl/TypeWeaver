/// <reference types="node" />
declare const _default: {
    createFromFile: (filePath: string, useChecksum: boolean) => any;
    create: (cacheId: string, _path: string, useChecksum: boolean) => {
        cache: any;
        getHash: (buffer: Buffer) => string;
        hasFileChanged: (file: string) => any;
        analyzeFiles: (files: Array<string>) => {
            changedFiles: any[];
            notFoundFiles: any[];
            notChangedFiles: any[];
        };
        getFileDescriptor: (file: string) => any;
        _getFileDescriptorUsingMtimeAndSize: (file: string, fstat: fs.Stats) => {
            key: string;
            changed: any;
            meta: any;
        };
        _getFileDescriptorUsingChecksum: (file: string) => {
            key: string;
            changed: boolean;
            meta: any;
        };
        getUpdatedFiles: (files: Array<string>) => any;
        normalizeEntries: (files: FileEntry[]) => any[];
        removeEntry: (entryName: string) => void;
        deleteCacheFile: () => void;
        destroy: () => void;
        _getMetaForFileUsingCheckSum: (cacheEntry: CacheEntry) => any;
        _getMetaForFileUsingMtimeAndSize: (cacheEntry: CacheEntry) => any;
        reconcile: (noPrune: boolean) => void;
    };
};
export default _default;
