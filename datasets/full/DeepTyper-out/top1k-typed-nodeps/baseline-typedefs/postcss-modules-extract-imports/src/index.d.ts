declare const topologicalSort: any;
declare const matchImports: RegExp;
declare const icssImport: RegExp;
declare const VISITED_MARKER: number;
declare function addImportToGraph(importId: string, parentId: string, graph: any, visited: any): void;
