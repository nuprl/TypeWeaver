declare function parseMapToJSON(string: string, data: object): any[];
declare function resolveSourceMap(code: string, codeUrl: string, read: Function, callback: Function): string;
declare function resolveSourceMapSync(code: string, codeUrl: string, read: string): object;
declare function resolveSources(map: HTMLElement, mapUrl: string, read: Function, options: object, callback: Function): void;
declare function resolveSourcesSync(map: HTMLElement, mapUrl: string, read: Function, options: object): HTMLElement;
declare function resolve(code: string, codeUrl: string, read: Function, options: Function, callback: Function): void;
declare function resolveSync(code: string, codeUrl: string, read: string, options: object): HTMLElement;
declare const _default: {
    resolveSourceMap: typeof resolveSourceMap;
    resolveSourceMapSync: typeof resolveSourceMapSync;
    resolveSources: typeof resolveSources;
    resolveSourcesSync: typeof resolveSourcesSync;
    resolve: typeof resolve;
    resolveSync: typeof resolveSync;
    parseMapToJSON: typeof parseMapToJSON;
};
export default _default;
