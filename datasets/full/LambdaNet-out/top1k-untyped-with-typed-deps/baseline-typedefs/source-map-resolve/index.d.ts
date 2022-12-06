declare var atob: Function;
declare var urlLib: string;
declare var pathLib: string;
declare var decodeUriComponentLib: Function;
declare function resolveUrl(): any[];
declare function convertWindowsPath(aPath: string): string;
declare function customDecodeUriComponent(string: string): boolean;
declare function callbackAsync(callback: Function, error: object, result: string): void;
declare function parseMapToJSON(string: string, data: object): any[];
declare function readSync(read: Function, url: string, data: object): number;
declare var innerRegex: RegExp;
declare var sourceMappingURLRegex: string;
declare function getSourceMappingUrl(code: string): string;
declare function resolveSourceMap(code: string, codeUrl: string, read: Function, callback: Function): string;
declare function resolveSourceMapSync(code: string, codeUrl: string, read: string): object;
declare var dataUriRegex: RegExp;
declare var jsonMimeTypeRegex: RegExp;
declare var jsonCharacterEncoding: string;
declare function base64ToBuf(b64: string): object;
declare function decodeBase64String(b64: string): boolean;
declare function resolveSourceMapHelper(code: string, codeUrl: string): object;
declare function resolveSources(map: HTMLElement, mapUrl: string, read: Function, options: object, callback: Function): void;
declare function resolveSourcesSync(map: HTMLElement, mapUrl: string, read: Function, options: object): HTMLElement;
declare var endingSlash: RegExp;
declare function resolveSourcesHelper(map: HTMLElement, mapUrl: string, options: object, fn: Function): void;
declare function resolve(code: string, codeUrl: string, read: Function, options: Function, callback: Function): void;
declare function resolveSync(code: string, codeUrl: string, read: string, options: object): HTMLElement;
