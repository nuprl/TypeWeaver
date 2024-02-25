export function createFromFile(filePath: any, useChecksum: any): {
    /**
     * the flat cache storage used to persist the metadata of the `files
     * @type {Object}
     */
    cache: any;
    /**
     * Given a buffer, calculate md5 hash of its content.
     * @method getHash
     * @param  {Buffer} buffer   buffer to calculate hash on
     * @return {String}          content hash digest
     */
    getHash: (buffer: Buffer) => string;
    /**
     * Return whether or not a file has changed since last time reconcile was called.
     * @method hasFileChanged
     * @param  {String}  file  the filepath to check
     * @return {Boolean}       wheter or not the file has changed
     */
    hasFileChanged: (file: string) => boolean;
    /**
     * given an array of file paths it return and object with three arrays:
     *  - changedFiles: Files that changed since previous run
     *  - notChangedFiles: Files that haven't change
     *  - notFoundFiles: Files that were not found, probably deleted
     *
     * @param  {Array} files the files to analyze and compare to the previous seen files
     * @return {[type]}       [description]
     */
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
    /**
     * Return the list o the files that changed compared
     * against the ones stored in the cache
     *
     * @method getUpdated
     * @param files {Array} the array of files to compare against the ones in the cache
     * @returns {Array}
     */
    getUpdatedFiles: (files: any[]) => any[];
    /**
     * return the list of files
     * @method normalizeEntries
     * @param files
     * @returns {*}
     */
    normalizeEntries: (files: any) => any;
    /**
     * Remove an entry from the file-entry-cache. Useful to force the file to still be considered
     * modified the next time the process is run
     *
     * @method removeEntry
     * @param entryName
     */
    removeEntry: (entryName: any) => void;
    /**
     * Delete the cache file from the disk
     * @method deleteCacheFile
     */
    deleteCacheFile: () => void;
    /**
     * remove the cache from the file and clear the memory cache
     */
    destroy: () => void;
    _getMetaForFileUsingCheckSum: (cacheEntry: any) => any;
    _getMetaForFileUsingMtimeAndSize: (cacheEntry: any) => any;
    /**
     * Sync the files and persist them to the cache
     * @method reconcile
     */
    reconcile: (noPrune: any) => void;
};
export function create(cacheId: any, _path: any, useChecksum: any): {
    /**
     * the flat cache storage used to persist the metadata of the `files
     * @type {Object}
     */
    cache: any;
    /**
     * Given a buffer, calculate md5 hash of its content.
     * @method getHash
     * @param  {Buffer} buffer   buffer to calculate hash on
     * @return {String}          content hash digest
     */
    getHash: (buffer: Buffer) => string;
    /**
     * Return whether or not a file has changed since last time reconcile was called.
     * @method hasFileChanged
     * @param  {String}  file  the filepath to check
     * @return {Boolean}       wheter or not the file has changed
     */
    hasFileChanged: (file: string) => boolean;
    /**
     * given an array of file paths it return and object with three arrays:
     *  - changedFiles: Files that changed since previous run
     *  - notChangedFiles: Files that haven't change
     *  - notFoundFiles: Files that were not found, probably deleted
     *
     * @param  {Array} files the files to analyze and compare to the previous seen files
     * @return {[type]}       [description]
     */
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
    /**
     * Return the list o the files that changed compared
     * against the ones stored in the cache
     *
     * @method getUpdated
     * @param files {Array} the array of files to compare against the ones in the cache
     * @returns {Array}
     */
    getUpdatedFiles: (files: any[]) => any[];
    /**
     * return the list of files
     * @method normalizeEntries
     * @param files
     * @returns {*}
     */
    normalizeEntries: (files: any) => any;
    /**
     * Remove an entry from the file-entry-cache. Useful to force the file to still be considered
     * modified the next time the process is run
     *
     * @method removeEntry
     * @param entryName
     */
    removeEntry: (entryName: any) => void;
    /**
     * Delete the cache file from the disk
     * @method deleteCacheFile
     */
    deleteCacheFile: () => void;
    /**
     * remove the cache from the file and clear the memory cache
     */
    destroy: () => void;
    _getMetaForFileUsingCheckSum: (cacheEntry: any) => any;
    _getMetaForFileUsingMtimeAndSize: (cacheEntry: any) => any;
    /**
     * Sync the files and persist them to the cache
     * @method reconcile
     */
    reconcile: (noPrune: any) => void;
};
