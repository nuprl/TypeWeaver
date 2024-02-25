export = SymbolTreeNode;
declare class SymbolTreeNode {
    parent: any;
    previousSibling: any;
    nextSibling: any;
    firstChild: any;
    lastChild: any;
    /** This value is incremented anytime a children is added or removed */
    childrenVersion: number;
    /** The last child object which has a cached index */
    childIndexCachedUpTo: any;
    /** This value represents the cached node index, as long as
     * cachedIndexVersion matches with the childrenVersion of the parent */
    cachedIndex: number;
    cachedIndexVersion: number;
    get isAttached(): boolean;
    get hasChildren(): boolean;
    childrenChanged(): void;
    getCachedIndex(parentNode: any): number;
    setCachedIndex(parentNode: any, index: any): void;
}
