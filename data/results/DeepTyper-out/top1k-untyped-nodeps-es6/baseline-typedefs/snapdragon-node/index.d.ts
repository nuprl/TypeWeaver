declare class Node {
    constructor(type: any, value: any, clone: any);
    clone(): any;
    stringify(fn?: (n: any) => any): string;
    push(node: any): any;
    unshift(node: any): any;
    pop(): any;
    shift(): any;
    remove(node: any): any;
    find(type: any, n?: number): any;
    visit(fn: any): void;
    has(node: any): any;
    hasType(type: any): any;
    isType(type: any): boolean;
    isEmpty(fn: any): boolean;
    isInside(type: any): any;
    get siblings(): any;
    set index(index: any);
    get index(): any;
    get prev(): any;
    get next(): any;
    get first(): any;
    get last(): any;
    get depth(): any;
    static isNode(node: any): boolean;
}
export default Node;
