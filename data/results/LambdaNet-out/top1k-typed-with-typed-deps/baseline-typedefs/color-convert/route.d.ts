declare const conversions: object;
declare function buildGraph(): object;
declare function deriveBFS(fromModel: string): object;
declare function link(from: Function, to: Function): Function;
declare function wrapConversion(toModel: string, graph: object): string;
