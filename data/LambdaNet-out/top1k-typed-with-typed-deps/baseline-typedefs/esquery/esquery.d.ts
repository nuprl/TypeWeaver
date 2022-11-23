declare function query(ast: string, selector: string, options: object): string;
declare namespace query {
    var parse: (selector: string) => Void;
    var match: (ast: string, selector: string, options: object) => any[];
    var traverse: (ast: Function, selector: number, visitor: string, options: object) => Void;
    var matches: (node: object, selector: object, ancestry: any[], options: object) => boolean;
    var query: typeof import("./esquery.js").default;
}
export default query;
