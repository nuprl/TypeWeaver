declare const PERMANENT_MARKER: number;
declare const TEMPORARY_MARKER: number;
declare function createError(node: object, graph: object): object;
declare function walkGraph(node: object, graph: object, state: object, result: any[], strict: string): string;
declare function topologicalSort(graph: Function, strict: string): any[];
