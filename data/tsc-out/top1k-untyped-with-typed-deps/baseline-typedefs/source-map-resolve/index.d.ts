export function resolveSourceMap(code: any, codeUrl: any, read: any, callback: any): void;
export function resolveSourceMapSync(code: any, codeUrl: any, read: any): {
    sourceMappingURL: any;
    url: any;
    sourcesRelativeTo: any;
    map: any;
};
export function resolveSources(map: any, mapUrl: any, read: any, options: any, callback: any): void;
export function resolveSourcesSync(map: any, mapUrl: any, read: any, options: any): {
    sourcesResolved: any[];
    sourcesContent: any[];
};
export function resolve(code: any, codeUrl: any, read: any, options: any, callback: any): void;
export function resolveSync(code: any, codeUrl: any, read: any, options: any): {
    sourceMappingURL: any;
    url: any;
    sourcesRelativeTo: any;
    map: any;
};
export function parseMapToJSON(string: any, data: any): any;
