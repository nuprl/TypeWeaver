declare const DEFAULT_COLLECTION_PROP: string;
declare const DEFAULT_SINGLE_PROP: string;
declare class NodePath {
    constructor(node: any, parentPath?: any, property?: any, index?: any);
    _enforceProp(property: any): void;
    setChild(node: any, index?: any, property?: any): string;
    appendChild(node: any, property?: any): string;
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
    static getForNode(node: any, parentPath?: any, prop?: any, index?: number): string;
    static initRegistry(): void;
    static updateTraversingIndex(dx: any): any;
    static getTraversingIndex(): any;
}
declare function jsonSkipLoc(prop: number, value: any[]): Promise;
