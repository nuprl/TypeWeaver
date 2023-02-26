declare var isWindows: boolean;
declare var splitWindowsRe: RegExp;
declare var win32: {};
declare function win32SplitPath(filename: string): string[];
declare var splitPathRe: RegExp;
declare var posix: {};
declare function posixSplitPath(filename: string): string[];
