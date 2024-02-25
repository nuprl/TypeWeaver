declare namespace _default {
    export { resolveSourceMap };
    export { resolveSourceMapSync };
    export { resolveSources };
    export { resolveSourcesSync };
    export { resolve };
    export { resolveSync };
    export { parseMapToJSON };
}
export default _default;
declare function resolveSourceMap(code: any, codeUrl: any, read: any, callback: any): void;
declare function resolveSourceMapSync(code: any, codeUrl: any, read: any): {
    sourceMappingURL: any;
    url: any;
    sourcesRelativeTo: any;
    map: any;
};
declare function resolveSources(map: any, mapUrl: any, read: any, options: any, callback: any): void;
declare function resolveSourcesSync(map: any, mapUrl: any, read: any, options: any): {
    sourcesResolved: any[];
    sourcesContent: any[];
};
declare function resolve(code: any, codeUrl: any, read: any, options: any, callback: any): void;
declare function resolveSync(code: any, codeUrl: any, read: any, options: any): {
    sourceMappingURL: any;
    url: any;
    sourcesRelativeTo: any;
    map: any;
};
declare function parseMapToJSON(string: any, data: any): any;
