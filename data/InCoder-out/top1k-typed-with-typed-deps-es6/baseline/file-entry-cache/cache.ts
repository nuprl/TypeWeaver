import path from 'path';
import crypto from 'crypto';

export default {
  createFromFile: function (filePath: string | Buffer,  useChecksum: boolean | undefined) {
    var fname = path.basename(filePath);
    var dir = path.dirname(filePath);
    return this.create(fname, dir, useChecksum);
  },

  create: function (cacheId: number,  _path: number,  useChecksum: number) {
    var fs = require('fs');
    var flatCache = require('flat-cache');
    var cache = flatCache.load(cacheId, _path);
    var normalizedEntries = {};

    var removeNotFoundFiles = function removeNotFoundFiles() {
      const cachedEntries = cache.keys();
      // remove not found entries
      cachedEntries.forEach(function remover(fPath: string | Buffer) {
        try {
          fs.statSync(fPath);
        } catch (err) {
          if (err.code === 'ENOENT') {
            cache.removeKey(fPath);
          }
        }
      });
    };

    removeNotFoundFiles();

    return {
      /**
       * the flat cache storage used to persist the metadata of the `files
       * @type {Object}
       */
      cache: cache,

      /**
       * Given a buffer, calculate md5 hash of its content.
       * @method getHash
       * @param  {Buffer} buffer   buffer to calculate hash on
       * @return {String}          content hash digest
       */
      getHash: function (buffer: Buffer) {
        return crypto.createHash('md5').update(buffer).digest('hex');
      },

      /**
       * Return whether or not a file has changed since last time reconcile was called.
       * @method hasFileChanged
       * @param  {String}  file  the filepath to check
       * @return {Boolean}       wheter or not the file has changed
       */
      hasFileChanged: function (file: File) {
        return this.getFileDescriptor(file).changed;
      },

      /**
       * given an array of file paths it return and object with three arrays:
       *  - changedFiles: Files that changed since previous run
       *  - notChangedFiles: Files that haven't change
       *  - notFoundFiles: Files that were not found, probably deleted
       *
       * @param  {Array} files the files to analyze and compare to the previous seen files
       * @return {[type]}       [description]
       */
      analyzeFiles: function (files: string[]) {
        var me = this;
        files = files || [];

        var res = {
          changedFiles: [],
          notFoundFiles: [],
          notChangedFiles: [],
        };

        me.normalizeEntries(files).forEach(function (entry: Entry) {
          if (entry.changed) {
            res.changedFiles.push(entry.key);
            return;
          }
          if (entry.notFound) {
            res.notFoundFiles.push(entry.key);
            return;
          }
          res.notChangedFiles.push(entry.key);
        });
        return res;
      },

      getFileDescriptor: function (file: File) {
        var fstat;

        try {
          fstat = fs.statSync(file);
        } catch (ex) {
          this.removeEntry(file);
          return { key: file, notFound: true, err: ex };
        }

        if (useChecksum) {
          return this._getFileDescriptorUsingChecksum(file);
        }

        return this._getFileDescriptorUsingMtimeAndSize(file, fstat);
      },

      _getFileDescriptorUsingMtimeAndSize: function (file: File,  fstat: Stats) {
        var meta = cache.getKey(file);
        var cacheExists = !!meta;

        var cSize = fstat.size;
        var cTime = fstat.mtime.getTime();

        var isDifferentDate;
        var isDifferentSize;

        if (!meta) {
          meta = { size: cSize, mtime: cTime };
        } else {
          isDifferentDate = cTime !== meta.mtime;
          isDifferentSize = cSize !== meta.size;
        }

        var nEntry = (normalizedEntries[file] = {
          key: file,
          changed: !cacheExists || isDifferentDate || isDifferentSize,
          meta: meta,
        });

        return nEntry;
      },

      _getFileDescriptorUsingChecksum: function (file: File) {
        var meta = cache.getKey(file);
        var cacheExists = !!meta;

        var contentBuffer;
        try {
          contentBuffer = fs.readFileSync(file);
        } catch (ex) {
          contentBuffer = '';
        }

        var isDifferent = true;
        var hash = this.getHash(contentBuffer);

        if (!meta) {
          meta = { hash: hash };
        } else {
          isDifferent = hash !== meta.hash;
        }

        var nEntry = (normalizedEntries[file] = {
          key: file,
          changed: !cacheExists || isDifferent,
          meta: meta,
        });

        return nEntry;
      },

      /**
       * Return the list o the files that changed compared
       * against the ones stored in the cache
       *
       * @method getUpdated
       * @param files {Array} the array of files to compare against the ones in the cache
       * @returns {Array}
       */
      getUpdatedFiles: function (files: string[]) {
        var me = this;
        files = files || [];

        return me
          .normalizeEntries(files)
          .filter(function (entry: FileSystemEntry) {
            return entry.changed;
          })
          .map(function (entry: any) {
            return entry.key;
          });
      },

      /**
       * return the list of files
       * @method normalizeEntries
       * @param files
       * @returns {*}
       */
      normalizeEntries: function (files: string[]) {
        files = files || [];

        var me = this;
        var nEntries = files.map(function (file: File) {
          return me.getFileDescriptor(file);
        });

        //normalizeEntries = nEntries;
        return nEntries;
      },

      /**
       * Remove an entry from the file-entry-cache. Useful to force the file to still be considered
       * modified the next time the process is run
       *
       * @method removeEntry
       * @param entryName
       */
      removeEntry: function (entryName: any) {
        delete normalizedEntries[entryName];
        cache.removeKey(entryName);
      },

      /**
       * Delete the cache file from the disk
       * @method deleteCacheFile
       */
      deleteCacheFile: function () {
        cache.removeCacheFile();
      },

      /**
       * remove the cache from the file and clear the memory cache
       */
      destroy: function () {
        normalizedEntries = {};
        cache.destroy();
      },

      _getMetaForFileUsingCheckSum: function (cacheEntry: CacheEntry) {
        var contentBuffer = fs.readFileSync(cacheEntry.key);
        var hash = this.getHash(contentBuffer);
        var meta = Object.assign(cacheEntry.meta, { hash: hash });
        delete meta.size;
        delete meta.mtime;
        return meta;
      },

      _getMetaForFileUsingMtimeAndSize: function (cacheEntry: CacheEntry) {
        var stat = fs.statSync(cacheEntry.key);
        var meta = Object.assign(cacheEntry.meta, {
          size: stat.size,
          mtime: stat.mtime.getTime(),
        });
        delete meta.hash;
        return meta;
      },

      /**
       * Sync the files and persist them to the cache
       * @method reconcile
       */
      reconcile: function (noPrune: boolean) {
        removeNotFoundFiles();

        noPrune = typeof noPrune === 'undefined' ? true : noPrune;

        var entries = normalizedEntries;
        var keys = Object.keys(entries);

        if (keys.length === 0) {
          return;
        }

        var me = this;

        keys.forEach(function (entryName: any) {
          var cacheEntry = entries[entryName];

          try {
            var meta = useChecksum
              ? me._getMetaForFileUsingCheckSum(cacheEntry)
              : me._getMetaForFileUsingMtimeAndSize(cacheEntry);
            cache.setKey(entryName, meta);
          } catch (err) {
            // if the file does not exists we don't save it
            // other errors are just thrown
            if (err.code !== 'ENOENT') {
              throw err;
            }
          }
        });

        cache.save(noPrune);
      },
    };
  },
};