declare const _default: {
    createFromFile: (filePath: string, useChecksum: number) => any;
    create: (cacheId: string, _path: string, useChecksum: boolean) => {
        cache: HTMLElement;
        getHash: (buffer: object) => string;
        hasFileChanged: (file: string) => any;
        analyzeFiles: (files: number) => object;
        getFileDescriptor: (file: string) => any;
        _getFileDescriptorUsingMtimeAndSize: (file: string, fstat: object) => number;
        _getFileDescriptorUsingChecksum: (file: string) => number;
        getUpdatedFiles: (files: number) => any;
        normalizeEntries: (files: any[]) => any[];
        removeEntry: (entryName: string) => void;
        deleteCacheFile: () => void;
        destroy: () => void;
        _getMetaForFileUsingCheckSum: (cacheEntry: object) => object;
        _getMetaForFileUsingMtimeAndSize: (cacheEntry: object) => object;
        reconcile: (noPrune: number) => void;
    };
};
export default _default;
