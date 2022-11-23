declare const DEFAULT_COLLECTION_PROP = "expressions";
declare const DEFAULT_SINGLE_PROP = "expression";
declare class NodePath {
    constructor(node: any, parentPath?: any, property?: any, index?: any);
    _enforceProp(property: any): void;
    setChild(node: any, index?: any, property?: any): any;
    appendChild(node: any, property?: any): any;
    insertChildAt(node: any, index: any, property?: string): void;
    remove(): void;
    _rebuildIndex(parent: any, property: any): void;
    isRemoved(): boolean;
    replace(newNode: any): any;
    update(nodeProps: any): void;
    getParent(): any;
    getChild(n?: number): any;
    hasEqualSource(path: any): boolean;
    jsonEncode({ format, useLoc }?: {
        format: any;
        useLoc: any;
    }): string;
    getPreviousSibling(): any;
    getNextSibling(): any;
    static getForNode(node: any, parentPath?: any, prop?: any, index?: number): any;
    static initRegistry(): void;
    static updateTraversingIndex(dx: any): any;
    static getTraversingIndex(): any;
}
declare function jsonSkipLoc(prop: any, value: any): any;
