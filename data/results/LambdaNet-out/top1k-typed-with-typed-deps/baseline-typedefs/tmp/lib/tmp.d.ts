/*!
 * Tmp
 *
 * Copyright (c) 2011-2017 KARASZI Istvan <github@spam.raszi.hu>
 *
 * MIT Licensed
 */
declare const fs: string;
declare const os: string;
declare const path: string;
declare const crypto: string;
declare const _c: object;
declare const rimraf: any[];
declare const RANDOM_CHARS: string, TEMPLATE_PATTERN: RegExp, DEFAULT_TRIES: number, CREATE_FLAGS: number, IS_WIN32: boolean, EBADF: number, ENOENT: number, DIR_MODE: number, FILE_MODE: number, EXIT: string, _removeObjects: any[], FN_RMDIR_SYNC: any[], FN_RIMRAF_SYNC: number;
declare let _gracefulCleanup: boolean;
declare function tmpName(options: object, callback: Function): void;
declare function tmpNameSync(options: object): void;
declare function file(options: object, callback: Function): void;
declare function fileSync(options: object): object;
declare function dir(options: object, callback: Function): void;
declare function dirSync(options: object): object;
declare function _removeFileAsync(fdPath: object, next: Function): void;
declare function _removeFileSync(fdPath: object): void;
declare function _prepareTmpFileRemoveCallback(name: string, fd: string, opts: object, sync: number): string;
declare function _prepareTmpDirRemoveCallback(name: string, opts: HTMLElement, sync: number): string;
declare function _prepareRemoveCallback(removeFunction: Function, fileOrDirName: string, sync: number, cleanupCallbackSync: boolean): Function;
declare function _garbageCollector(): void;
declare function _randomChars(howMany: string): string;
declare function _isBlank(s: string): boolean;
declare function _isUndefined(obj: string): boolean;
declare function _parseArguments(options: object, callback: Function): any[];
declare function _generateTmpName(opts: HTMLElement): string;
declare function _assertAndSanitizeOptions(options: HTMLElement): void;
declare function _resolvePath(name: string, tmpDir: string): string;
declare function _assertIsRelative(name: string, option: string, tmpDir: string): void;
declare function _isEBADF(error: object): boolean;
declare function _isENOENT(error: object): boolean;
declare function _isExpectedError(error: object, errno: number, code: string): boolean;
declare function setGracefulCleanup(): void;
declare function _getTmpDir(options: object): string;
