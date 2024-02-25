export = createRBTree;
declare function createRBTree(compare: any): RedBlackTree;
declare function RedBlackTree(compare: any, root: any): void;
declare class RedBlackTree {
    constructor(compare: any, root: any);
    _compare: any;
    root: any;
}
