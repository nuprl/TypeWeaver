declare const TREE: unique symbol;
declare const ROOT: unique symbol;
declare const NEXT: unique symbol;
declare const ITERATE_FUNC: unique symbol;
declare class TreeIterator {
    constructor(tree: any, root: any, firstResult: any, iterateFunction: any);
    next(): {
        done: boolean;
        value: any;
    };
}
