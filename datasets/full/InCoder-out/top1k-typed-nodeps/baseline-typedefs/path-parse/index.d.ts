/// <reference types="node" />
declare var isWindows: boolean;
declare var splitWindowsRe: RegExp;
declare var win32: {};
declare function win32SplitPath(filename: string | Buffer): string[];
declare var splitPathRe: RegExp;
declare var posix: {};
declare function posixSplitPath(filename: string | Buffer): string[];
