declare const _default: {
    createFromFile: (filePath: string, useChecksum: any) => any;
    create: (cacheId: string, _path: string, useChecksum: any) => {
        cache: any;
        getHash: (buffer: any) => string;
        hasFileChanged: (file: any) => any;
        analyzeFiles: (files: any[]) => any;
        getFileDescriptor: (file: any) => any;
        _getFileDescriptorUsingMtimeAndSize: (file: any, fstat: any) => any;
        _getFileDescriptorUsingChecksum: (file: any) => any;
        getUpdatedFiles: (files: any) => any;
        normalizeEntries: (files: any) => any;
        removeEntry: (entryName: any) => void;
        deleteCacheFile: () => void;
        destroy: () => void;
        _getMetaForFileUsingCheckSum: (cacheEntry: any) => any;
        _getMetaForFileUsingMtimeAndSize: (cacheEntry: any) => any;
        reconcile: (noPrune: any) => void;
    };
};
export default _default;
