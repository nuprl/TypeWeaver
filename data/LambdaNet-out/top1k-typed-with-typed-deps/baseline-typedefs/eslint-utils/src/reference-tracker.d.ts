export declare const READ: string;
export declare const CALL: string;
export declare const CONSTRUCT: string;
export declare const ESM: string;
export declare class ReferenceTracker {
    constructor(globalScope: any, { mode, globalObjectNames, }?: {
        mode?: string;
        globalObjectNames?: string[];
    });
    iterateGlobalReferences(traceMap: any): Generator<any, void, any>;
    iterateCjsReferences(traceMap: any): Generator<any, void, any>;
    iterateEsmReferences(traceMap: any): Generator<any, void, undefined>;
    _iterateVariableReferences(variable: any, path: any, traceMap: any, shouldReport: any): any;
    _iteratePropertyReferences(rootNode: any, path: any, traceMap: any): any;
    _iterateLhsReferences(patternNode: any, path: any, traceMap: any): any;
    _iterateImportReferences(specifierNode: any, path: any, traceMap: any): Generator<any, void, any>;
}
