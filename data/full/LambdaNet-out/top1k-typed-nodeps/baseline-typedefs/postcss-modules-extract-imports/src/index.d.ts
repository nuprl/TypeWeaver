declare const topologicalSort: string;
declare const matchImports: RegExp;
declare const icssImport: RegExp;
declare const VISITED_MARKER: number;
declare function addImportToGraph(importId: string, parentId: number, graph: object, visited: object): void;
