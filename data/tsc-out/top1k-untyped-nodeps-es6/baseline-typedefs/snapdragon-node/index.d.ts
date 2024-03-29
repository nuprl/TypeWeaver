export default Node;
declare class Node {
    static isNode(node: any): boolean;
    constructor(type: any, value: any, clone: any);
    type: any;
    value: any;
    clone(): any;
    stringify(fn?: (n: any) => any): string;
    push(node: any): number;
    nodes: any;
    unshift(node: any): number;
    pop(): number;
    shift(): any;
    remove(node: any): any;
    find(type: string, n?: number): any;
    visit(fn: any): any;
    has(node: any): boolean;
    hasType(type: string): boolean;
    isType(type: string): boolean;
    isEmpty(fn: Function): boolean;
    isInside(type: string): boolean;
    get siblings(): any[];
    set index(arg: any);
    get index(): any;
    get prev(): any;
    get next(): any;
    get first(): any;
    get last(): any;
    get depth(): any;
}
