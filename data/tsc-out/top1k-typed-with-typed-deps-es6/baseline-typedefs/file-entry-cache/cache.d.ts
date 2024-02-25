declare namespace _default {
    function createFromFile(filePath: any, useChecksum: any): {
        cache: any;
        getHash: (buffer: Buffer) => string;
        hasFileChanged: (file: string) => boolean;
        analyzeFiles: (files: any[]) => [type];
        getFileDescriptor: (file: any) => {
            key: any;
            changed: boolean;
            meta: any;
        } | {
            key: any;
            notFound: boolean;
            err: any;
        };
        _getFileDescriptorUsingMtimeAndSize: (file: any, fstat: any) => {
            key: any;
            changed: boolean;
            meta: any;
        };
        _getFileDescriptorUsingChecksum: (file: any) => {
            key: any;
            changed: boolean;
            meta: any;
        };
        getUpdatedFiles: (files: any[]) => any[];
        normalizeEntries: (files: any) => any;
        removeEntry: (entryName: any) => void;
        deleteCacheFile: () => void;
        destroy: () => void;
        _getMetaForFileUsingCheckSum: (cacheEntry: any) => any;
        _getMetaForFileUsingMtimeAndSize: (cacheEntry: any) => any;
        reconcile: (noPrune: any) => void;
    };
    function create(cacheId: any, _path: any, useChecksum: any): {
        cache: any;
        getHash: (buffer: Buffer) => string;
        hasFileChanged: (file: string) => boolean;
        analyzeFiles: (files: any[]) => [type];
        getFileDescriptor: (file: any) => {
            key: any;
            changed: boolean;
            meta: any;
        } | {
            key: any;
            notFound: boolean;
            err: any;
        };
        _getFileDescriptorUsingMtimeAndSize: (file: any, fstat: any) => {
            key: any;
            changed: boolean;
            meta: any;
        };
        _getFileDescriptorUsingChecksum: (file: any) => {
            key: any;
            changed: boolean;
            meta: any;
        };
        getUpdatedFiles: (files: any[]) => any[];
        normalizeEntries: (files: any) => any;
        removeEntry: (entryName: any) => void;
        deleteCacheFile: () => void;
        destroy: () => void;
        _getMetaForFileUsingCheckSum: (cacheEntry: any) => any;
        _getMetaForFileUsingMtimeAndSize: (cacheEntry: any) => any;
        reconcile: (noPrune: any) => void;
    };
}
export default _default;
