declare function parseMapToJSON(string: any, data: any): string;
declare function resolveSourceMap(code: string, codeUrl: string, read: any, callback: Function): any;
declare function resolveSourceMapSync(code: string, codeUrl: string, read: any): any;
declare function resolveSources(map: any, mapUrl: any, read: any, options: any, callback: any): any;
declare function resolveSourcesSync(map: any, mapUrl: any, read: any, options: any): any;
declare function resolve(code: string, codeUrl: any, read: any, options: any, callback: any): any;
declare function resolveSync(code: string, codeUrl: any, read: any, options: any): any;
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
