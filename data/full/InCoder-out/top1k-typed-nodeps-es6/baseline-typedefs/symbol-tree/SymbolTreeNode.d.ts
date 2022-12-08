export default class SymbolTreeNode {
    constructor();
    get isAttached(): boolean;
    get hasChildren(): boolean;
    childrenChanged(): void;
    getCachedIndex(parentNode: any): any;
    setCachedIndex(parentNode: any, index: any): void;
}
