/*!
 * Tmp
 *
 * Copyright (c) 2011-2017 KARASZI Istvan <github@spam.raszi.hu>
 *
 * MIT Licensed
 */
declare const fs: any;
declare const os: any;
declare const path: any;
declare const crypto: any;
declare const _c: any;
declare const rimraf: any;
declare const RANDOM_CHARS: RegExp, TEMPLATE_PATTERN: RegExp, DEFAULT_TRIES = 3, CREATE_FLAGS: number, IS_WIN32: boolean, EBADF: any, ENOENT: any, DIR_MODE = 448, FILE_MODE = 384, EXIT = "exit", _removeObjects: any[], FN_RMDIR_SYNC: any, FN_RIMRAF_SYNC: any;
declare let _gracefulCleanup: boolean;
declare function tmpName(options: any, callback: any): void;
declare function tmpNameSync(options: any): void;
declare function file(options: any, callback: any): any;
declare function fileSync(options: any): any;
declare function dir(options: any, callback: any): any;
declare function dirSync(options: any): any;
declare function _removeFileAsync(fdPath: any, next: any): any;
declare function _removeFileSync(fdPath: any): void;
declare function _prepareTmpFileRemoveCallback(name: string, fd: any, opts: any, sync: boolean): any;
declare function _prepareTmpDirRemoveCallback(name: string, opts: any, sync: boolean): any;
declare function _prepareRemoveCallback(removeFunction: any, fileOrDirName: any, sync: boolean, cleanupCallbackSync: boolean): boolean;
declare function _garbageCollector(): void;
declare function _randomChars(howMany: any): any;
declare function _isBlank(s: string): boolean;
declare function _isUndefined(obj: any): boolean;
declare function _parseArguments(options: any, callback: any): any;
declare function _generateTmpName(opts: any): any;
declare function _assertAndSanitizeOptions(options: any): void;
declare function _resolvePath(name: string, tmpDir: string): string;
declare function _assertIsRelative(name: string, option: string, tmpDir: string): void;
declare function _isEBADF(error: any): string;
declare function _isENOENT(error: any): string;
declare function _isExpectedError(error: Error, errno: string, code: any): boolean;
declare function setGracefulCleanup(): void;
declare function _getTmpDir(options: any): any;
