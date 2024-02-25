export default class SymbolTreeNode {
    parent: any;
    previousSibling: any;
    nextSibling: any;
    firstChild: any;
    lastChild: any;
    childrenVersion: number;
    childIndexCachedUpTo: any;
    cachedIndex: number;
    cachedIndexVersion: number;
    get isAttached(): boolean;
    get hasChildren(): boolean;
    childrenChanged(): void;
    getCachedIndex(parentNode: any): number;
    setCachedIndex(parentNode: any, index: any): void;
}
