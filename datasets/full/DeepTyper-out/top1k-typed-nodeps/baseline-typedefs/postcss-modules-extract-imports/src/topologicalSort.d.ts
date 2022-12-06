declare const PERMANENT_MARKER: number;
declare const TEMPORARY_MARKER: number;
declare function createError(node: any, graph: any): void;
declare function walkGraph(node: any, graph: any, state: any, result: any, strict: boolean): any;
declare function topologicalSort(graph: any, strict: boolean): any;
