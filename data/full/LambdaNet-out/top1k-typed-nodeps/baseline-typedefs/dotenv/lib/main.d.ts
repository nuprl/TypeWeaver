declare const fs: string;
declare const path: string;
declare const os: string;
declare const LINE: RegExp;
declare function parse(src: string): object;
declare function _log(message: string): void;
declare function _resolveHome(envPath: any[]): string;
declare function config(options: object): object;
declare const DotenvModule: object;
